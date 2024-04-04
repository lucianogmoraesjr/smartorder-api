import { randomUUID } from 'node:crypto';

import { faker } from '@faker-js/faker';
import { Ingredient } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export function makeIngredient(
  override: Partial<Ingredient> = {},
  id?: string,
) {
  const ingredient: Ingredient = {
    id: id ?? randomUUID(),
    name: faker.commerce.productMaterial(),
    emoji: faker.internet.emoji(),
    ...override,
  };

  return ingredient;
}

export async function makePrismaIngredient(
  data: Partial<Ingredient> = {},
): Promise<Ingredient> {
  const ingredient = makeIngredient(data);

  await prisma.ingredient.create({
    data: ingredient,
  });

  return ingredient;
}
