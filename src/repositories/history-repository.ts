import { History } from '@prisma/client';

export interface IHistoryRepository {
  createArchive(orderId: string): Promise<void>;
  listArchived(): Promise<History[] | null>;
}
