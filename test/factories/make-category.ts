import { randomUUID } from 'node:crypto';

import { faker } from '@faker-js/faker';
import { Category } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export function makeCategory(override: Partial<Category> = {}, id?: string) {
  const category: Category = {
    id: id ?? randomUUID(),
    name: faker.commerce.department(),
    emoji: faker.internet.emoji(),
    ...override,
  };

  return category;
}

type PartialCategory = Pick<Category, 'name'> & Partial<Omit<Category, 'name'>>;

export async function makePrismaCategory(
  data: PartialCategory,
): Promise<Category> {
  const category = makeCategory(data);

  await prisma.category.create({
    data: category,
  });

  return category;
}
