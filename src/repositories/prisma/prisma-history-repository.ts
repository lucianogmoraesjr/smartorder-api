import { IHistoryRepository } from '../history-repository';

import { PrismaArchivedOrderMapper } from './mappers/prisma-history-mapper';

import { IOrder } from '@/entities/order';
import { prisma } from '@/lib/prisma';

export class PrismaHistoryRepository implements IHistoryRepository {
  async createArchive(orderId: string): Promise<void> {
    await prisma.history.create({
      data: {
        orderId,
      },
    });
  }

  async listArchived(): Promise<IOrder[] | null> {
    const archivedOrders = await prisma.history.findMany({
      include: {
        order: {
          include: {
            products: {
              include: {
                product: {
                  include: {
                    ingredients: {
                      include: {
                        ingredient: true,
                      },
                    },
                    category: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!archivedOrders) {
      return null;
    }

    return archivedOrders.map(PrismaArchivedOrderMapper.toDomain);
  }
}
