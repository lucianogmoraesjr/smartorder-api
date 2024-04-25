import { ArchiveRecentOrdersUseCase } from '../archive-recent-orders-use-case';

import { PrismaHistoryRepository } from '@/repositories/prisma/prisma-history-repository';
import { PrismaOrdersRepository } from '@/repositories/prisma/prisma-orders-repository';

export function makeArchiveRecentOrdersUseCase() {
  const prismaOrdersRepository = new PrismaOrdersRepository();
  const prismaHistoryRepository = new PrismaHistoryRepository();
  const archiveRecentOrdersUseCase = new ArchiveRecentOrdersUseCase(
    prismaOrdersRepository,
    prismaHistoryRepository,
  );

  return archiveRecentOrdersUseCase;
}
