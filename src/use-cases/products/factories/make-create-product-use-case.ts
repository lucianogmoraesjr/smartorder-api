import { CreateProductUseCase } from '../create-product-use-case';

import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository';

export function makeCreateProductUseCase() {
  const prismaProductsRepository = new PrismaProductsRepository();
  const createProductUseCase = new CreateProductUseCase(
    prismaProductsRepository,
  );

  return createProductUseCase;
}
