import { AppError } from '@/errors/app-error';
import { IOrdersRepository } from '@/repositories/orders-repository';

export class CancelOrderUseCase {
  constructor(private ordersRepository: IOrdersRepository) {}

  async execute(id: string) {
    const orderExists = await this.ordersRepository.findById(id);

    if (!orderExists) {
      throw new AppError('Order not found', 404);
    }

    await this.ordersRepository.delete(id);
  }
}
