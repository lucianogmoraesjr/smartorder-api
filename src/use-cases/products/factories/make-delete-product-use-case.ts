import { DeleteProductUseCase } from '../delete-product-use-case';

import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository';

export function makeDeleteProductUseCase() {
  const prismaProductsRepository = new PrismaProductsRepository();
  const deleteProductUseCase = new DeleteProductUseCase(
    prismaProductsRepository,
  );

  return deleteProductUseCase;
}
