import { History } from '@prisma/client';

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

  async listArchived(): Promise<History[] | null> {
    const archivedOrders = await prisma.history.findMany();

    if (!archivedOrders) {
      return null;
    }

    return archivedOrders;
  }
}
