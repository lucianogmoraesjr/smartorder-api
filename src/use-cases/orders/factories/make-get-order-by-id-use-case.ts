import { GetOrderByIdUseCase } from '../get-order-by-id-use-case';

import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository';

export function makeGetOrderByIdUseCase() {
  const prismaOrdersRepository = new PrismaOrdersRepository();
  const getOrderByIdUseCase = new GetOrderByIdUseCase(prismaOrdersRepository);

  return getOrderByIdUseCase;
}
