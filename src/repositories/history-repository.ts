import { IOrder } from '@/entities/order';

export interface IHistoryRepository {
  createArchive(orderId: string): Promise<void>;
  listArchived(): Promise<IOrder[] | null>;
}
