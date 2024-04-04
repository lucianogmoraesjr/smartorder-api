import { randomUUID } from 'node:crypto';

import { faker } from '@faker-js/faker';
import { Product } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export function makeProduct(override: Partial<Product> = {}, id?: string) {
  const product: Product = {
    id: id ?? randomUUID(),
    name: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    categoryId: randomUUID(),
    imagePath: faker.internet.url(),
    priceInCents: Number(faker.commerce.price({ min: 700, max: 5000, dec: 0 })),
    ...override,
  };

  return product;
}

type PartialProduct = Partial<Omit<Product, 'categoryId'>> &
  Pick<Product, 'categoryId'> &
  Pick<Product, 'name'>;

export async function makePrismaProduct(
  data: PartialProduct,
): Promise<Product> {
  const product = makeProduct(data);

  await prisma.product.create({
    data: product,
  });

  return product;
}
