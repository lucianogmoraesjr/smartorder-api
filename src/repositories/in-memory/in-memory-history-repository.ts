import { randomUUID } from 'node:crypto';

import { History } from '@prisma/client';

import { IHistoryRepository } from '../history-repository';

export class InMemoryHistoryRepository implements IHistoryRepository {
  public history: History[] = [];

  async createArchive(orderId: string): Promise<void> {
    const archive: History = {
      id: randomUUID(),
      orderId,
    };

    this.history.push(archive);
  }

  async listArchived(): Promise<History[] | null> {
    const archivedOrders = this.history;

    if (!archivedOrders) {
      return null;
    }

    return archivedOrders;
  }
}
