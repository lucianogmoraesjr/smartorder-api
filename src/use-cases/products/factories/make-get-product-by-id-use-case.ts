import { GetProductByIdUseCase } from '../get-product-by-id-use-case';

import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository';

export function makeGetProductByIdUseCase() {
  const prismaProductsRepository = new PrismaProductsRepository();
  const getProductByIdUseCase = new GetProductByIdUseCase(
    prismaProductsRepository,
  );

  return getProductByIdUseCase;
}
