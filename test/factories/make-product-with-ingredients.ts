import { randomUUID } from 'node:crypto';

import { faker } from '@faker-js/faker';
import { Product } from '@prisma/client';

import { makeIngredient } from './make-ingredient';

import { prisma } from '@/lib/prisma';

export function makeProductWithIngredients(
  override: Partial<Product> = {},
  id?: string,
) {
  const product: Product = {
    id: id ?? randomUUID(),
    name: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    categoryId: randomUUID(),
    imagePath: faker.internet.url(),
    priceInCents: Number(faker.finance.amount({ min: 10, max: 50, dec: 0 })),
    ...override,
  };

  const ingredients = [];

  for (let i = 0; i < 3; i++) {
    ingredients.push({
      ingredientId: makeIngredient().id,
    });
  }

  return { ...product, ingredients };
}

export async function makePrismaProduct(
  data: Partial<Product> = {},
): Promise<Product> {
  const product = makeProductWithIngredients(data);

  await prisma.product.create({
    data: {
      name: product.name,
      description: product.description,
      priceInCents: product.priceInCents,
      imagePath: product.imagePath,
      categoryId: product.categoryId,
    },
  });

  const productsIngredients = product.ingredients.map(ingredient => {
    return {
      ingredientId: ingredient.ingredientId,
      productId: product.id,
    };
  });

  await prisma.productsIngredients.createMany({ data: productsIngredients });

  return product;
}
