import { CancelOrderUseCase } from '../cancel-order-use-case';

import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository';

export function makeCancelOrderUseCase() {
  const prismaOrdersRepository = new PrismaOrdersRepository();
  const cancelOrderUseCase = new CancelOrderUseCase(prismaOrdersRepository);

  return cancelOrderUseCase;
}
