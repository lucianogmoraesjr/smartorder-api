import { ListProductsUseCase } from '../list-products-use-case';

import { PrismaProductsRepository } from '@/repositories/prisma/prisma-products-repository';

export function makeListProductsUseCase() {
  const prismaProductsRepository = new PrismaProductsRepository();
  const listProductsUseCase = new ListProductsUseCase(prismaProductsRepository);

  return listProductsUseCase;
}
