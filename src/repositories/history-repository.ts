export interface IHistoryRepository {
  createArchive(orderId: string): Promise<void>;
}
