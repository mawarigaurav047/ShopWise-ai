import { PrismaClient, Prisma } from '@prisma/client';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed for ShopWise AI...');

  // 1. Seed Categories
  console.log(`📦 Seeding ${CATEGORIES.length} categories...`);
  for (const category of CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        icon: category.icon,
        description: category.description,
        image: category.image,
        productCount: category.productCount,
      },
      create: {
        id: category.id,
        slug: category.slug,
        name: category.name,
        icon: category.icon,
        description: category.description,
        image: category.image,
        productCount: category.productCount,
      },
    });
  }
  console.log('✅ Categories seeded successfully.');

  // 2. Seed Products
  console.log(`✨ Seeding ${PRODUCTS.length} products...`);
  for (const product of PRODUCTS) {
    const productData = {
      name: product.name,
      brand: product.brand,
      categorySlug: product.category,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      rating: product.rating,
      reviewCount: product.reviewCount,
      image: product.image,
      images: (product.images ?? []) as unknown as Prisma.InputJsonValue,
      description: product.description,
      specs: (product.specs ?? []) as unknown as Prisma.InputJsonValue,
      aiMatch: product.aiMatch as unknown as Prisma.InputJsonValue,
      stock: product.stock ?? 0,
      inStock: product.inStock ?? true,
      isTrending: product.isTrending ?? false,
      isFeatured: product.isFeatured ?? false,
      isDeal: product.isDeal ?? false,
      tags: (product.tags ?? []) as unknown as Prisma.InputJsonValue,
      features: (product.features ?? []) as unknown as Prisma.InputJsonValue,
      specifications: (product.specifications ?? {}) as unknown as Prisma.InputJsonValue,
      warranty: product.warranty ?? null,
      seller: product.seller ?? null,
      pros: (product.pros ?? []) as unknown as Prisma.InputJsonValue,
      cons: (product.cons ?? []) as unknown as Prisma.InputJsonValue,
      aiReviewSummary: product.aiReviewSummary
        ? (product.aiReviewSummary as unknown as Prisma.InputJsonValue)
        : Prisma.JsonNull,
    };

    await prisma.product.upsert({
      where: { id: product.id },
      update: productData,
      create: {
        id: product.id,
        ...productData,
      },
    });
  }
  console.log('✅ Products seeded successfully.');

  console.log('🎉 Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
