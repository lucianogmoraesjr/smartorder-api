import { ListProductsByCategoryUseCase } from '../list-products-by-category-use-case';

import { PrismaProductsIngredientsRepository } from '@/repositories/prisma/prisma-products-ingredients-repository';
import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository';

export function makeListProductsByCategoryUseCase() {
  const prismaProductsIngredientsRepository =
    new PrismaProductsIngredientsRepository();
  const prismaProductsRepository = new PrismaProductsRepository(
    prismaProductsIngredientsRepository,
  );
  const listProductsByCategoryUseCase = new ListProductsByCategoryUseCase(
    prismaProductsRepository,
  );

  return listProductsByCategoryUseCase;
}
