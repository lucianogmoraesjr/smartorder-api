import { Ingredient, Prisma } from '@prisma/client';

import { IIngredientsRepository } from '../ingredients-repository';

import { prisma } from '@/lib/prisma';

export class PrismaIngredientsRepository implements IIngredientsRepository {
  async findAll(): Promise<Ingredient[] | null> {
    const ingredients = await prisma.ingredient.findMany();

    return ingredients;
  }

  async findByName(name: string): Promise<Ingredient | null> {
    const ingredient = await prisma.ingredient.findUnique({
      where: {
        name,
      },
    });

    if (!ingredient) {
      return null;
    }

    return ingredient;
  }

  async create(data: Prisma.IngredientCreateInput): Promise<Ingredient> {
    const ingredient = await prisma.ingredient.create({ data });

    return ingredient;
  }
}
