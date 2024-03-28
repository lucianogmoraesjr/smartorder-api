import { CreateProductUseCase } from '../create-product-use-case';

import { PrismaProductsIngredientsRepository } from '@/repositories/prisma/prisma-products-ingredients-repository';
import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository';

export function makeCreateProductUseCase() {
  const prismaProductsIngredientsRepository =
    new PrismaProductsIngredientsRepository();
  const prismaProductsRepository = new PrismaProductsRepository(
    prismaProductsIngredientsRepository,
  );
  const createProductUseCase = new CreateProductUseCase(
    prismaProductsRepository,
  );

  return createProductUseCase;
}
