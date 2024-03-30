import { ListOrdersUseCase } from '../list-orders-use-case';

import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository';

export function makeListOrdersUseCase() {
  const prismaOrdersRepository = new PrismaOrdersRepository();
  const listOrdersUseCase = new ListOrdersUseCase(prismaOrdersRepository);

  return listOrdersUseCase;
}
