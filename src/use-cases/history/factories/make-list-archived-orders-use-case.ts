import { ListArchivedOrdersUseCase } from '../list-archived-orders-use-case';

import { PrismaHistoryRepository } from '@/repositories/prisma/prisma-history-repository';

export function makeListArchivedOrdersUseCase() {
  const prismaHistoryRepository = new PrismaHistoryRepository();
  const listArchivedOrdersUseCase = new ListArchivedOrdersUseCase(
    prismaHistoryRepository,
  );

  return listArchivedOrdersUseCase;
}
