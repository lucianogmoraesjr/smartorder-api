import { randomUUID } from 'node:crypto';

import { faker } from '@faker-js/faker';
import { Category, Product } from '@prisma/client';

import { makeIngredient } from './make-ingredient';
import { makeProduct } from './make-product';

import { prisma } from '@/lib/prisma';

type ProductWithIngredients = Product & {
  ingredients?: Array<{
    ingredientId: string;
  }>;
};

export function makeProductWithIngredients(
  override: Partial<ProductWithIngredients> = {},
  id?: string,
) {
  const product: ProductWithIngredients = {
    id: id ?? randomUUID(),
    name: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    categoryId: randomUUID(),
    imagePath: faker.internet.url(),
    priceInCents: Number(
      faker.finance.amount({ min: 1000, max: 5000, dec: 0 }),
    ),
    ingredients: [
      {
        ingredientId: makeIngredient().id,
      },
      {
        ingredientId: makeIngredient().id,
      },
      {
        ingredientId: makeIngredient().id,
      },
    ],
    ...override,
  };

  return product;
}

type PartialProductWithIngredients = {
  id?: string;
  name: string;
  description?: string;
  imagePath?: string;
  priceInCents?: number;
  category: Category;
  ingredients: Array<{
    ingredientId: string;
  }>;
};

export async function makePrismaProductWithIngredients({
  category,
  name,
  ingredients,
}: PartialProductWithIngredients) {
  const newProduct = makeProduct({ name, categoryId: category.id });

  const product = await prisma.product.create({
    data: {
      name: newProduct.name,
      description: newProduct.description,
      priceInCents: newProduct.priceInCents,
      imagePath: newProduct.imagePath,
      categoryId: newProduct.categoryId,
      ingredients: {
        create: ingredients.map(ingredient => ({
          ingredient: {
            connect: { id: ingredient.ingredientId },
          },
        })),
      },
    },
    include: {
      ingredients: {
        select: {
          ingredient: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  return product;
}
