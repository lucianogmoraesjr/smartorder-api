import { IOrderWithDetails } from '@/entities/order-with-details';

export interface IHistoryRepository {
  createArchive(orderId: string): Promise<void>;
  createManyArchive(orderIds: string[]): Promise<void>;
  listArchived(): Promise<IOrderWithDetails[] | null>;
}
