import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            id: true,
            slug: true,
            name: true,
            icon: true,
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: `Product with ID '${id}' not found` },
        { status: 404 }
      );
    }

    const formattedProduct = {
      ...product,
      category: product.categorySlug,
    };

    return NextResponse.json({
      success: true,
      data: formattedProduct,
    });
  } catch (error: any) {
    console.error('Error fetching product by ID:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch product from database',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined,
      },
      { status: 500 }
    );
  }
}
