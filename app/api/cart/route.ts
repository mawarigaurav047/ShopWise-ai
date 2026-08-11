import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

/**
 * Helper to get authenticated Clerk user ID
 */
async function getAuthUserId(request: NextRequest): Promise<string | null> {
  try {
    const authResult = await auth();
    if (authResult?.userId) {
      return authResult.userId;
    }
  } catch {}

  const headerUserId = request.headers.get('x-user-id');
  const urlUserId = request.nextUrl.searchParams.get('userId');
  const candidate = headerUserId || urlUserId;

  // Only consider candidate if it doesn't start with guest_
  if (candidate && !candidate.startsWith('guest_')) {
    return candidate;
  }

  return null;
}

/**
 * GET /api/cart
 * Returns the user's DB cart directly when authenticated.
 */
export async function GET(request: NextRequest) {
  try {
    const userId = await getAuthUserId(request);

    if (!userId) {
      return NextResponse.json({
        success: true,
        sessionType: 'anonymous',
        userId: null,
        items: [],
        count: 0,
        total: 0,
      });
    }

    // Ensure User row exists in DB
    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: { id: userId },
    });

    const dbItems = await prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: true,
      },
      orderBy: { createdAt: 'asc' },
    });

    const items = dbItems.map((item) => ({
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
      product: item.product,
    }));

    const total = items.reduce(
      (sum, item) => sum + (item.product?.price || 0) * item.quantity,
      0
    );

    return NextResponse.json({
      success: true,
      sessionType: 'authenticated',
      userId,
      items,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      total,
    });
  } catch (error: any) {
    console.error('Cart API GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch cart', message: error?.message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/cart
 * Handles:
 * 1. Smart merge: { action: 'merge', items: [{ productId, quantity }] }
 * 2. Set quantity: { productId, quantity, action: 'set' }
 * 3. Add quantity: { productId, quantity }
 */
export async function POST(request: NextRequest) {
  try {
    const userId = await getAuthUserId(request);
    const body = await request.json();

    if (!userId) {
      // Guest mode: acknowledge request without DB mutation
      return NextResponse.json({
        success: true,
        sessionType: 'anonymous',
        userId: null,
        message: 'Guest session cart acknowledged',
        body,
      });
    }

    // Ensure User exists in PostgreSQL
    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: { id: userId },
    });

    // 1. SMART MERGE STRATEGY
    if (body.action === 'merge' && Array.isArray(body.items)) {
      for (const item of body.items) {
        if (!item.productId) continue;
        const qty = Math.max(1, Number(item.quantity) || 1);

        // Check if item exists in DB for this user
        const existing = await prisma.cartItem.findUnique({
          where: {
            userId_productId: {
              userId,
              productId: item.productId,
            },
          },
        });

        if (existing) {
          // Duplicate found: add quantities together
          await prisma.cartItem.update({
            where: { id: existing.id },
            data: { quantity: existing.quantity + qty },
          });
        } else {
          // New item: insert into DB
          await prisma.cartItem.create({
            data: {
              userId,
              productId: item.productId,
              quantity: qty,
            },
          });
        }
      }
    }
    // 2. SET QUANTITY DIRECTLY
    else if (body.action === 'set' && body.productId) {
      const qty = Number(body.quantity);
      if (qty <= 0) {
        await prisma.cartItem.deleteMany({
          where: {
            userId,
            productId: body.productId,
          },
        });
      } else {
        await prisma.cartItem.upsert({
          where: {
            userId_productId: {
              userId,
              productId: body.productId,
            },
          },
          update: { quantity: qty },
          create: {
            userId,
            productId: body.productId,
            quantity: qty,
          },
        });
      }
    }
    // 3. ADD / INCREMENT ITEM
    else if (body.productId) {
      const qty = Math.max(1, Number(body.quantity) || 1);
      await prisma.cartItem.upsert({
        where: {
          userId_productId: {
            userId,
            productId: body.productId,
          },
        },
        update: {
          quantity: { increment: qty },
        },
        create: {
          userId,
          productId: body.productId,
          quantity: qty,
        },
      });
    }

    // Return the updated DB cart
    const updatedDbItems = await prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: true,
      },
      orderBy: { createdAt: 'asc' },
    });

    const items = updatedDbItems.map((item) => ({
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
      product: item.product,
    }));

    const total = items.reduce(
      (sum, item) => sum + (item.product?.price || 0) * item.quantity,
      0
    );

    return NextResponse.json({
      success: true,
      sessionType: 'authenticated',
      userId,
      items,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      total,
    });
  } catch (error: any) {
    console.error('Cart API POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update cart', message: error?.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/cart
 * Removes a specific product or clears the entire cart in PostgreSQL
 */
export async function DELETE(request: NextRequest) {
  try {
    const userId = await getAuthUserId(request);
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const clearAll = searchParams.get('clearAll') === 'true';

    if (!userId) {
      return NextResponse.json({
        success: true,
        sessionType: 'anonymous',
        userId: null,
        message: 'Guest session deletion acknowledged',
      });
    }

    if (productId) {
      await prisma.cartItem.deleteMany({
        where: {
          userId,
          productId,
        },
      });
    } else if (clearAll || !productId) {
      await prisma.cartItem.deleteMany({
        where: { userId },
      });
    }

    // Return updated cart
    const updatedDbItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
      orderBy: { createdAt: 'asc' },
    });

    const items = updatedDbItems.map((item) => ({
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
      product: item.product,
    }));

    return NextResponse.json({
      success: true,
      sessionType: 'authenticated',
      userId,
      items,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      total: items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0),
    });
  } catch (error: any) {
    console.error('Cart API DELETE error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete from cart', message: error?.message },
      { status: 500 }
    );
  }
}
