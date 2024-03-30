import { CreateOrderUseCase } from '../create-order-use-case';

import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository';

export function makeCreateOrderUseCase() {
  const prismaOrdersRepository = new PrismaOrdersRepository();
  const createOrderUseCase = new CreateOrderUseCase(prismaOrdersRepository);

  return createOrderUseCase;
}
