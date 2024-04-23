import { AppError } from '@/errors/app-error';
import { IHistoryRepository } from '@/repositories/history-repository';
import { IOrdersRepository } from '@/repositories/orders-repository';

export class ArchiveOrderUseCase {
  constructor(
    private ordersRepository: IOrdersRepository,
    private historyRepository: IHistoryRepository,
  ) {}

  async execute(orderId: string) {
    const orderExists = await this.ordersRepository.findById(orderId);

    if (!orderExists) {
      throw new AppError('Order not found', 404);
    }

    await this.ordersRepository.markAsArchived(orderId);

    await this.historyRepository.createArchive(orderId);
  }
}
