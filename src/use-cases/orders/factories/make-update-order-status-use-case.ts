import { UpdateOrderStatusUseCase } from '../update-order-status-use-case';

import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository';

export function makeUpdateOrderStatusUseCase() {
  const prismaOrdersRepository = new PrismaOrdersRepository();
  const updateOrderStatusUseCase = new UpdateOrderStatusUseCase(
    prismaOrdersRepository,
  );

  return updateOrderStatusUseCase;
}
