import { PrismaClient } from '@prisma/client';
import { generateEmbedding, formatVectorForPg } from '../utils/embeddings';

const prisma = new PrismaClient();

function getUsageScenarios(categorySlug: string, name: string): string {
  const cat = categorySlug.toLowerCase();
  const title = name.toLowerCase();

  const scenarios: string[] = [];

  if (cat === 'refrigerators' || title.includes('refrigerator') || title.includes('fridge')) {
    scenarios.push('food storage', 'kitchen cooling', 'cold preservation', 'fresh food', 'refrigeration', 'ice making');
  } else if (cat === 'acs' || title.includes('ac') || title.includes('conditioner')) {
    scenarios.push('room cooling', 'silent cooling', 'inverter ac', 'temperature control', 'energy saving', 'summer cooling');
  } else if (cat === 'laptops' || title.includes('laptop') || title.includes('macbook')) {
    scenarios.push('coding', 'programming', 'developer', 'gaming', 'office work', 'college student', 'portable computing');
  } else if (cat === 'tvs' || title.includes('tv') || title.includes('television')) {
    scenarios.push('home cinema', '4K display', 'movies and series', 'streaming', 'console gaming', 'smart television');
  } else if (cat === 'washing-machines' || title.includes('wash')) {
    scenarios.push('laundry', 'clothes washing', 'stain removal', 'fabric care', 'automatic washing');
  } else if (cat === 'headphones' || title.includes('headphone') || title.includes('audio')) {
    scenarios.push('music listening', 'active noise cancellation', 'focus and study', 'hands-free calling', 'commute');
  } else if (cat === 'microwaves' || title.includes('microwave') || title.includes('oven')) {
    scenarios.push('baking', 'grilling', 'reheating meals', 'cooking', 'kitchen appliance', 'defrosting');
  } else if (cat === 'air-purifiers' || title.includes('purifier')) {
    scenarios.push('clean air', 'HEPA filtration', 'AQI sensing', 'allergen removal', 'dust and smoke purification');
  } else if (cat === 'mobiles' || title.includes('phone') || title.includes('galaxy')) {
    scenarios.push('smartphone', '5G communication', 'photography', 'mobile gaming', 'multitasking');
  }

  return scenarios.join(', ');
}

async function syncEmbeddings() {
  console.log('🚀 Starting semantic vector embedding sync for all products in PostgreSQL...\n');

  const products = await prisma.product.findMany();
  console.log(`📦 Found ${products.length} products to process.\n`);

  let updatedCount = 0;

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    console.log(`[${i + 1}/${products.length}] Processing "${product.name}" (${product.brand})...`);

    const featuresList = Array.isArray(product.features) ? product.features.join(', ') : '';
    const prosList = Array.isArray(product.pros) ? product.pros.join(', ') : '';
    const targetUser = (product.aiMatch as any)?.targetUser || '';
    const usageScenarios = getUsageScenarios(product.categorySlug, product.name);

    // Construct a rich textual representation for vector embedding
    const textToEmbed = `
Product Name: ${product.name}
Brand: ${product.brand}
Category: ${product.categorySlug}
Description: ${product.description}
Key Features: ${featuresList}
Target Use Case: ${targetUser}
Pros: ${prosList}
Usage Scenarios: ${usageScenarios}
`.trim();

    try {
      const embedding = await generateEmbedding(textToEmbed);
      const vectorString = formatVectorForPg(embedding);

      // Save vector embedding using tagged template prisma.$executeRaw with explicit ::vector cast
      await prisma.$executeRaw`
        UPDATE "Product" 
        SET embedding = ${vectorString}::vector 
        WHERE id = ${product.id}
      `;

      updatedCount++;
      console.log(`   ✅ Successfully saved rich vector embedding.`);
    } catch (err) {
      console.error(`   ❌ Failed to generate or save embedding for ${product.id}:`, err);
    }
  }

  console.log(`\n🎉 Vector sync complete! Successfully updated ${updatedCount}/${products.length} products with rich contextual embeddings.`);
}

syncEmbeddings()
  .catch((e) => {
    console.error('Fatal error during vector sync:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
