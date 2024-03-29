import { Ingredient, Prisma } from '@prisma/client';

import { IIngredientsRepository } from '../ingredients-repository';

import { prisma } from '@/lib/prisma';

export class PrismaIngredientsRepository implements IIngredientsRepository {
  findAll(): Promise<Ingredient[] | null> {
    throw new Error('Method not implemented.');
  }

  findById(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    id: string,
  ): Promise<Ingredient | null> {
    throw new Error('Method not implemented.');
  }

  async create(data: Prisma.IngredientCreateInput): Promise<Ingredient> {
    const ingredient = await prisma.ingredient.create({ data });

    return ingredient;
  }
}
