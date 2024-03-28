import { ListProductsUseCase } from '../list-products-use-case';

import { PrismaProductsIngredientsRepository } from '@/repositories/prisma/prisma-products-ingredients-repository';
import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository';

export function makeListProductsUseCase() {
  const prismaProductsIngredientsRepository =
    new PrismaProductsIngredientsRepository();
  const prismaProductsRepository = new PrismaProductsRepository(
    prismaProductsIngredientsRepository,
  );
  const listProductsUseCase = new ListProductsUseCase(prismaProductsRepository);

  return listProductsUseCase;
}
