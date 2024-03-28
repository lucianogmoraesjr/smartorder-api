import { Prisma } from '@prisma/client';

import { IProductsIngredients } from '../products-ingredients-repository';

import { prisma } from '@/lib/prisma';

export class PrismaProductsIngredientsRepository
  implements IProductsIngredients
{
  async create(
    data: Prisma.ProductsIngredientsUncheckedCreateInput,
  ): Promise<void> {
    await prisma.productsIngredients.create({ data });
  }

  async createMany(
    data: Prisma.ProductsIngredientsUncheckedCreateInput[],
  ): Promise<void> {
    await prisma.productsIngredients.createMany({ data });
  }
}
