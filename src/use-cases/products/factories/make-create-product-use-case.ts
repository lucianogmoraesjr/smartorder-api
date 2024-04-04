import { CreateProductUseCase } from '../create-product-use-case';

import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository';
import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository';

export function makeCreateProductUseCase() {
  const prismaProductsRepository = new PrismaProductsRepository();
  const prismaCategoriesRepository = new PrismaCategoriesRepository();
  const createProductUseCase = new CreateProductUseCase(
    prismaProductsRepository,
    prismaCategoriesRepository,
  );

  return createProductUseCase;
}
