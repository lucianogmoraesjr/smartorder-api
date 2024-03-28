import { Prisma } from '@prisma/client';

export interface IProductsIngredientsRepository {
  create(data: Prisma.ProductsIngredientsUncheckedCreateInput): Promise<void>;
  createMany(
    data: Prisma.ProductsIngredientsUncheckedCreateInput[],
  ): Promise<void>;
}
