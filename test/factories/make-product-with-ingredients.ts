import { randomUUID } from 'node:crypto';

import { faker } from '@faker-js/faker';
import { Product } from '@prisma/client';

import { makePrismaCategory } from './make-category';
import { makeIngredient, makePrismaIngredient } from './make-ingredient';
import { makeProduct } from './make-product';

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
    priceInCents: Number(
      faker.finance.amount({ min: 1000, max: 5000, dec: 0 }),
    ),
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

export async function makePrismaProductWithIngredients(
  data: Partial<Product> = {},
): Promise<Product> {
  const category = await makePrismaCategory();

  const newProduct = makeProduct(data);

  const ingredients = [];

  for (let i = 0; i < 3; i++) {
    const ingredient = await makePrismaIngredient();

    ingredients.push({
      ingredientId: ingredient.id,
    });
  }

  const product = await prisma.product.create({
    data: {
      name: newProduct.name,
      description: newProduct.description,
      priceInCents: newProduct.priceInCents,
      imagePath: newProduct.imagePath,
      categoryId: category.id,
      ingredients: {
        create: ingredients.map(ingredient => ({
          ingredientId: ingredient.ingredientId,
        })),
      },
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
      ingredients: {
        select: {
          ingredient: true,
        },
      },
    },
  });

  return product;
}
