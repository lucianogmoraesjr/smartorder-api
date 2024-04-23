import { IHistoryRepository } from '@/repositories/history-repository';

export class ListArchivedOrdersUseCase {
  constructor(private historyRepository: IHistoryRepository) {}

  async execute() {
    const archivedOrders = await this.historyRepository.listArchived();

    return archivedOrders;
  }
}
