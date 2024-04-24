import { IHistoryRepository } from '../history-repository';

import { PrismaArchivedOrderWithDetailsMapper } from './mappers/prisma-history-mapper';

import { IOrderWithDetails } from '@/entities/order-with-details';
import { prisma } from '@/lib/prisma';

export class PrismaHistoryRepository implements IHistoryRepository {
  async createArchive(orderId: string): Promise<void> {
    await prisma.history.create({
      data: {
        orderId,
      },
    });
  }

  async listArchived(): Promise<IOrderWithDetails[] | null> {
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

    return archivedOrders.map(PrismaArchivedOrderWithDetailsMapper.toDomain);
  }
}
