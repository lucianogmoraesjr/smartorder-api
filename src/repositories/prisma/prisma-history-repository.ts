import { IHistoryRepository } from '../history-repository';

import { prisma } from '@/lib/prisma';

export class PrismaHistoryRepository implements IHistoryRepository {
  async createArchive(orderId: string): Promise<void> {
    await prisma.history.create({
      data: {
        orderId,
      },
    });
  }
}
