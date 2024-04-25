import { AppError } from '@/errors/app-error';
import { IHistoryRepository } from '@/repositories/history-repository';
import { IOrdersRepository } from '@/repositories/orders-repository';

export class ArchiveRecentOrdersUseCase {
  constructor(
    private ordersRepository: IOrdersRepository,
    private historyRepository: IHistoryRepository,
  ) {}

  async execute(orderIds: string[]) {
    for (const orderId of orderIds) {
      const orderExists = await this.ordersRepository.findById(orderId);

      if (!orderExists) {
        throw new AppError('One or more orders was not found', 404);
      }
    }

    await this.ordersRepository.markManyAsArchived(orderIds);

    await this.historyRepository.createManyArchive(orderIds);
  }
}
