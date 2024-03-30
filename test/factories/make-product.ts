import { randomUUID } from 'node:crypto';

import { faker } from '@faker-js/faker';
import { Product } from '@prisma/client';

import { makePrismaCategory } from './make-category';

import { prisma } from '@/lib/prisma';

export function makeProduct(override: Partial<Product> = {}, id?: string) {
  const product: Product = {
    id: id ?? randomUUID(),
    name: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    categoryId: randomUUID(),
    imagePath: faker.internet.url(),
    priceInCents: Number(faker.finance.amount({ min: 10, max: 50, dec: 0 })),
    ...override,
  };

  return product;
}

export async function makePrismaProduct(
  data: Partial<Product> = {},
): Promise<Product> {
  let categoryId;

  if (data.categoryId) {
    categoryId = data.categoryId;
  } else {
    const category = await makePrismaCategory();

    categoryId = category.id;
  }

  const product = makeProduct({ ...data, categoryId });

  await prisma.product.create({
    data: product,
  });

  return product;
}
