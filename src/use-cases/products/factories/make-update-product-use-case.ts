import { UpdateProductUseCase } from '../update-product-use-case';

import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository';

export function makeUpdateProductUseCase() {
  const prismaProductsRepository = new PrismaProductsRepository();
  const updateProductUseCase = new UpdateProductUseCase(
    prismaProductsRepository,
  );

  return updateProductUseCase;
}
