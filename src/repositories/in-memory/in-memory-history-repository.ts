import { randomUUID } from 'node:crypto';

import { History } from '@prisma/client';

import { IHistoryRepository } from '../history-repository';

import { IOrder } from '@/entities/order';

export class InMemoryHistoryRepository implements IHistoryRepository {
  public history: History[] = [];

  async createArchive(orderId: string): Promise<void> {
    const archive: History = {
      id: randomUUID(),
      orderId,
    };

    this.history.push(archive);
  }

  async createManyArchive(orderIds: string[]): Promise<void> {
    for (const orderId of orderIds) {
      const archive: History = {
        id: randomUUID(),
        orderId,
      };

      this.history.push(archive);
    }
  }

  async listArchived(): Promise<IOrder[] | null> {
    const archivedOrders = this.history;

    if (!archivedOrders) {
      return null;
    }

    return archivedOrders;
  }
}
