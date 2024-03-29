import { ListProductsByCategoryUseCase } from '../list-products-by-category-use-case';

import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository';

export function makeListProductsByCategoryUseCase() {
  const prismaProductsRepository = new PrismaProductsRepository();
  const listProductsByCategoryUseCase = new ListProductsByCategoryUseCase(
    prismaProductsRepository,
  );

  return listProductsByCategoryUseCase;
}
