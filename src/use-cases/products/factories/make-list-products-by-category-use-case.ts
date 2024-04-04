import { ListProductsByCategoryUseCase } from '../list-products-by-category-use-case';

import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository';
import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository';

export function makeListProductsByCategoryUseCase() {
  const prismaProductsRepository = new PrismaProductsRepository();
  const prismaCategoriesRepository = new PrismaCategoriesRepository();
  const listProductsByCategoryUseCase = new ListProductsByCategoryUseCase(
    prismaProductsRepository,
    prismaCategoriesRepository,
  );

  return listProductsByCategoryUseCase;
}
