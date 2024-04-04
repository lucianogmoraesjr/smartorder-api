import { prisma } from '@/lib/prisma';

export async function cleanDb() {
  await prisma.$transaction([
    prisma.orderProducts.deleteMany(),
    prisma.order.deleteMany(),
    prisma.productsIngredients.deleteMany(),
    prisma.product.deleteMany(),
    prisma.ingredient.deleteMany(),
    prisma.category.deleteMany(),
  ]);
}
