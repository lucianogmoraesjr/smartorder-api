import { ArchiveOrderUseCase } from '../archive-order-use-case';

import { PrismaHistoryRepository } from '@/repositories/prisma/prisma-history-repository';
import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository';

export function makeArchiveOrderUseCase() {
  const prismaOrdersRepository = new PrismaOrdersRepository();
  const prismaHistoryRepository = new PrismaHistoryRepository();
  const archiveOrderUseCase = new ArchiveOrderUseCase(
    prismaOrdersRepository,
    prismaHistoryRepository,
  );

  return archiveOrderUseCase;
}
