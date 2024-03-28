import { Prisma } from '@prisma/client';

export interface IProductsIngredients {
  create(data: Prisma.ProductsIngredientsUncheckedCreateInput): Promise<void>;
  createMany(
    data: Prisma.ProductsIngredientsUncheckedCreateInput[],
  ): Promise<void>;
}
