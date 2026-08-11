import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { GoogleGenAI } from '@google/genai';
import { generateEmbedding } from '@/utils/embeddings';

const apiKey =
  process.env.GEMINI_API_KEY ||
  process.env.GOOGLE_API_KEY ||
  process.env.GOOGLE_GENAI_API_KEY ||
  '';

let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  try {
    aiClient = new GoogleGenAI({ apiKey });
  } catch (e) {
    console.warn('Failed to initialize GoogleGenAI client:', e);
  }
}

interface UserIntent {
  thoughtProcess?: string;
  categorySlug: string | null;
  maxBudget: number | null;
  reasoning: string;
}

/**
 * Chain-of-Thought (CoT) Dual-Model Routing Agent (Gemini Flash -> Gemini Pro Fallback)
 * Forces step-by-step deduction before classifying category.
 */
async function understandUserIntent(query: string): Promise<UserIntent> {
  const clean = query.trim();
  if (!clean) {
    return {
      thoughtProcess: 'No query provided.',
      categorySlug: null,
      maxBudget: null,
      reasoning: 'No query provided.',
    };
  }

  const allowedCategories = [
    'air-conditioners',
    'laptops',
    'tvs',
    'refrigerators',
    'washing-machines',
    'mobiles',
    'headphones',
    'microwaves',
    'air-purifiers',
  ];

  const strictPrompt = `
You are an expert e-commerce routing AI. Analyze the underlying need of this user query: '${clean}'

First, write a step-by-step logical deduction of the user's problem in the 'thoughtProcess' field. Break down any indirect concepts (e.g., 'spilling juice' = stains = washing clothes).

Then, based on your deduction, classify the query into EXACTLY ONE of these categories: ['air-conditioners', 'laptops', 'tvs', 'refrigerators', 'washing-machines', 'mobiles', 'headphones', 'microwaves', 'air-purifiers']. 
- If the query is completely unrelated to these appliances, return null for the category.

Output strictly as JSON using this exact schema: 
{ 
  "thoughtProcess": "string (your step-by-step deduction)", 
  "categorySlug": "string | null", 
  "reasoning": "string (a short 1-sentence explanation for the user)" 
}
`.trim();

  if (aiClient) {
    let parsed: any = null;

    // ── Step 1: Fast Flash Model (gemini-1.5-flash) with CoT ─────────────────
    try {
      const flashResponse = await aiClient.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: strictPrompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.1,
        },
      });

      const flashText = flashResponse.text?.trim() || '';
      if (flashText) {
        parsed = JSON.parse(flashText);
        if (parsed && parsed.categorySlug) {
          if (parsed.thoughtProcess) {
            console.log(`[AI Router] 💭 Thought Process: ${parsed.thoughtProcess}`);
          }
          console.log(`[AI Router] ⚡ Routed by Flash (${parsed.categorySlug}): "${clean}"`);
        } else {
          parsed = null; // Flash was ambiguous/confused, escalate to Pro
        }
      }
    } catch (flashErr) {
      console.warn('[AI Router] Flash routing encountered error, falling back to Pro model:', flashErr);
      parsed = null;
    }

    // ── Step 2: Heavy Reasoning Fallback (gemini-1.5-pro) with CoT ────────────
    if (!parsed) {
      try {
        console.log('[AI Router] 🧠 Escalating query to Gemini Pro model for deep Chain-of-Thought reasoning...');
        const proResponse = await aiClient.models.generateContent({
          model: 'gemini-1.5-pro',
          contents: strictPrompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.1,
          },
        });

        const proText = proResponse.text?.trim() || '';
        if (proText) {
          parsed = JSON.parse(proText);
          if (parsed?.thoughtProcess) {
            console.log(`[AI Router] 💭 Thought Process (Pro): ${parsed.thoughtProcess}`);
          }
          console.log(`[AI Router] 🧠 Routed by Pro (${parsed?.categorySlug || 'null'}): "${clean}"`);
        }
      } catch (proErr) {
        console.warn('[AI Router] Pro routing call failed:', proErr);
      }
    }

    if (parsed) {
      let categorySlug = parsed.categorySlug || null;
      if (categorySlug === 'air-conditioners') {
        categorySlug = 'acs';
      }

      // Extract budget if present in query
      let maxBudget: number | null = null;
      const budgetMatch = clean.toLowerCase().match(/under\s*(?:₹|rs\.?)?\s*(\d+)(k?)/);
      if (budgetMatch) {
        let val = parseInt(budgetMatch[1], 10);
        if (budgetMatch[2] === 'k' || val < 1000) val *= 1000;
        maxBudget = val;
      }

      return {
        thoughtProcess: parsed.thoughtProcess || 'Deduction completed.',
        categorySlug: categorySlug && (allowedCategories.includes(categorySlug) || categorySlug === 'acs') ? categorySlug : null,
        maxBudget,
        reasoning: parsed.reasoning || `Matched query "${clean}" to appropriate product category.`,
      };
    }
  }

  // ── Step 3: Resilient Offline Problem-Deduction Fallback ───────────────────
  const q = clean.toLowerCase();
  let categorySlug: string | null = null;
  let thoughtProcess = `Analyzing semantic problem pattern for "${clean}".`;
  let reasoning = `Analyzed your requirements for "${clean}".`;

  if (
    q.includes('cloth') ||
    q.includes('shirt') ||
    q.includes('pant') ||
    q.includes('wash') ||
    q.includes('laundry') ||
    q.includes('stain') ||
    q.includes('juice') ||
    q.includes('spill') ||
    q.includes('mud') ||
    q.includes('garment')
  ) {
    thoughtProcess = `User mentions stains/spills on clothing -> requires clothes washing and fabric cleaning appliance.`;
    categorySlug = 'washing-machines';
    reasoning = 'Identified stain removal, fabric cleaning, and laundry wash requirements.';
  } else if (
    q.includes('food') ||
    q.includes('cold') ||
    q.includes('fridge') ||
    q.includes('refrigerator') ||
    q.includes('freezer') ||
    q.includes('ice') ||
    q.includes('groceries') ||
    q.includes('going bad') ||
    q.includes('spoil')
  ) {
    thoughtProcess = `User mentions preserving food/groceries or cold storage -> requires refrigeration appliance.`;
    categorySlug = 'refrigerators';
    reasoning = 'Identified food preservation, groceries chilling, and cold storage requirements.';
  } else if (
    q.includes('cooling') ||
    q.includes('room') ||
    q.includes('ac') ||
    q.includes('conditioner') ||
    q.includes('ton') ||
    q.includes('sweat') ||
    q.includes('hot room') ||
    q.includes('heat')
  ) {
    thoughtProcess = `User mentions room heat/cooling -> requires air conditioning appliance.`;
    categorySlug = 'acs';
    reasoning = 'Identified indoor climate control, heat relief, and air conditioning requirements.';
  } else if (
    q.includes('laptop') ||
    q.includes('coding') ||
    q.includes('macbook') ||
    q.includes('computer') ||
    q.includes('programming') ||
    q.includes('developer')
  ) {
    thoughtProcess = `User mentions computing, coding, or portable workstation -> requires laptop.`;
    categorySlug = 'laptops';
    reasoning = 'Identified computing, coding, multitasking, and productivity requirements.';
  } else if (
    q.includes('tv') ||
    q.includes('screen') ||
    q.includes('display') ||
    q.includes('movie') ||
    q.includes('television') ||
    q.includes('cartoon') ||
    q.includes('console') ||
    q.includes('ps5')
  ) {
    thoughtProcess = `User mentions display, movies, or TV entertainment -> requires television.`;
    categorySlug = 'tvs';
    reasoning = 'Identified television entertainment, home cinema, and gaming display requirements.';
  } else if (
    q.includes('headphone') ||
    q.includes('audio') ||
    q.includes('sound') ||
    q.includes('noise cancel') ||
    q.includes('earphone')
  ) {
    thoughtProcess = `User mentions personal audio or noise cancellation -> requires headphones.`;
    categorySlug = 'headphones';
    reasoning = 'Identified immersive audio, music listening, and active noise cancellation requirements.';
  } else if (
    q.includes('microwave') ||
    q.includes('oven') ||
    q.includes('baking') ||
    q.includes('grill') ||
    q.includes('reheat')
  ) {
    thoughtProcess = `User mentions baking, grilling, or reheating food -> requires microwave oven.`;
    categorySlug = 'microwaves';
    reasoning = 'Identified baking, grilling, and meal reheating appliance requirements.';
  } else if (
    q.includes('purifier') ||
    q.includes('aqi') ||
    q.includes('clean air') ||
    q.includes('hepa') ||
    q.includes('dust') ||
    q.includes('pollution') ||
    q.includes('breathe')
  ) {
    thoughtProcess = `User mentions dust, clean air, or air pollution -> requires air purifier.`;
    categorySlug = 'air-purifiers';
    reasoning = 'Identified clean air, HEPA allergen filtration, and indoor air purification requirements.';
  } else if (
    q.includes('phone') ||
    q.includes('mobile') ||
    q.includes('smartphone') ||
    q.includes('galaxy')
  ) {
    thoughtProcess = `User mentions smartphone/mobile device -> requires smartphone.`;
    categorySlug = 'mobiles';
    reasoning = 'Identified smartphone, mobile photography, and flagship performance requirements.';
  }

  let maxBudget: number | null = null;
  const budgetMatch = q.match(/under\s*(?:₹|rs\.?)?\s*(\d+)(k?)/);
  if (budgetMatch) {
    let val = parseInt(budgetMatch[1], 10);
    if (budgetMatch[2] === 'k' || val < 1000) val *= 1000;
    maxBudget = val;
  }

  console.log(`[AI Router] 💭 Thought Process (Offline): ${thoughtProcess}`);
  return { thoughtProcess, categorySlug, maxBudget, reasoning };
}

import { auth } from '@clerk/nextjs/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    let clerkUserId: string | null = null;
    try {
      const authResult = await auth();
      clerkUserId = authResult.userId;
    } catch {
      // Not authenticated via Clerk, fallback to guest/header
    }

    const activeUserId = clerkUserId || request.headers.get('x-user-id') || searchParams.get('userId') || null;
    const query = searchParams.get('query') || searchParams.get('q') || searchParams.get('search');
    const categoryParam = searchParams.get('category');
    const trending = searchParams.get('trending');
    const deal = searchParams.get('deal');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '3', 10);
    const sort = searchParams.get('sort');

    if (activeUserId) {
      console.log(`[API Session] Active session: ${activeUserId}`);
    }


    // ── 1. Hybrid Semantic Vector Search with Chain-of-Thought LLM Intent ──────
    if (query && query.trim().length > 0) {
      // 1. Understand User Intent with Gemini CoT Reasoning
      const userIntent = await understandUserIntent(query.trim());


      // 2. Generate Vector Embedding for User Query
      const queryVector = await generateEmbedding(query.trim());
      const vectorString = `[${queryVector.join(',')}]`;

      // 3. Resolve Target Category (explicit param or LLM-extracted category)
      let intendedCategory = categoryParam || userIntent.categorySlug;
      if (intendedCategory === 'air-conditioners') {
        intendedCategory = 'acs';
      }

      // 4. Strict Fallback: If no category intent was detected, return empty array immediately
      if (!intendedCategory) {
        return NextResponse.json({
          success: true,
          mode: 'llm-hybrid-vector-search',
          query,
          userIntent,
          detectedCategory: null,
          data: [],
          pagination: {
            total: 0,
            limit,
            count: 0,
          },
        });
      }

      // 5. Execute Vector Search strictly within the intended category
      let rawProducts: any[] = [];

      try {
        rawProducts = await prisma.$queryRaw<any[]>`
          SELECT id, name, brand, "categorySlug", price, "originalPrice", discount, rating, "reviewCount",
                 image, images, description, specs, features, specifications, warranty, seller, pros, cons, "aiMatch", "aiReviewSummary",
                 stock, "inStock", "isTrending", "isFeatured", "isDeal", tags, "createdAt", "updatedAt",
                 (1 - (embedding <=> ${vectorString}::vector)) AS similarity
          FROM "Product"
          WHERE embedding IS NOT NULL 
            AND "categorySlug" = ${intendedCategory}
          ORDER BY embedding <=> ${vectorString}::vector ASC
          LIMIT ${limit}
        `;
      } catch (vectorErr) {
        console.error('Vector similarity query failed, falling back to keyword search:', vectorErr);
        const keywordMatches = await prisma.product.findMany({
          where: { categorySlug: intendedCategory },
          take: limit,
        });
        rawProducts = keywordMatches.map((p) => ({ ...p, similarity: 0.88 }));
      }

      // Format match explanations dynamically using LLM reasoning as the first bullet point
      const formattedProducts = rawProducts.map((p, idx) => {
        let existingAiMatch = typeof p.aiMatch === 'string' ? JSON.parse(p.aiMatch) : (p.aiMatch || {});
        const existingWhy = existingAiMatch.whyMatches
          ? Array.isArray(existingAiMatch.whyMatches)
            ? existingAiMatch.whyMatches
            : [existingAiMatch.whyMatches]
          : [];

        const score = Math.min(98, Math.max(78, Math.round((p.similarity || 0.85) * 100 - idx * 2)));

        return {
          ...p,
          category: p.categorySlug,
          aiMatch: {
            ...existingAiMatch,
            score,
            whyMatches: [
              userIntent.reasoning,
              ...existingWhy.filter((w: string) => !w.includes('Specifically') && w !== userIntent.reasoning),
            ],
          },
        };
      });

      return NextResponse.json({
        success: true,
        mode: 'llm-hybrid-vector-search',
        query,
        userIntent,
        detectedCategory: intendedCategory,
        data: formattedProducts,
        pagination: {
          total: formattedProducts.length,
          limit,
          count: formattedProducts.length,
        },
      });
    }

    // ── 2. Standard Filtered Search (Non-vector queries) ─────────────────────
    const standardLimit = searchParams.get('limit') ? Math.min(100, Math.max(1, parseInt(searchParams.get('limit')!, 10))) : 50;

    const where: Prisma.ProductWhereInput = {};

    if (categoryParam) {
      where.categorySlug = categoryParam;
    }

    if (trending === 'true') {
      where.isTrending = true;
    }

    if (deal === 'true') {
      where.isDeal = true;
    }

    if (featured === 'true') {
      where.isFeatured = true;
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: 'desc' };
    if (sort === 'price-asc') {
      orderBy = { price: 'asc' };
    } else if (sort === 'price-desc') {
      orderBy = { price: 'desc' };
    } else if (sort === 'rating') {
      orderBy = { rating: 'desc' };
    }

    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        take: standardLimit,
        orderBy,
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
      }),
      prisma.product.count({ where }),
    ]);

    const formattedProducts = products.map((p) => ({
      ...p,
      category: p.categorySlug,
    }));

    return NextResponse.json({
      success: true,
      mode: 'standard-filter',
      data: formattedProducts,
      pagination: {
        total: totalCount,
        limit: standardLimit,
        count: formattedProducts.length,
      },
    });
  } catch (error: any) {
    console.error('Vector Search Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to perform vector search',
        message: error?.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}
