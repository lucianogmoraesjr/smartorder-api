import { AppError } from '../../errors/app-error';
import { OrdersRepository } from '../../repositories/orders-repository';

export class UpdateOrderStatusUseCase {
  private ordersRepository: OrdersRepository;

  constructor() {
    this.ordersRepository = new OrdersRepository();
  }

  async execute(id: string, status: string) {
    if (!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status)) {
      throw new AppError(
        'Status should be one of these: WAITING, IN_PRODUCTION, DONE.',
      );
    }

    await this.ordersRepository.updateStatus(id, status);
  }
}
