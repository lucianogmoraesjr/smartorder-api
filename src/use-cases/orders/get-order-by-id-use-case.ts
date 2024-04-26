import { IOrdersRepository } from '../../repositories/orders-repository';

import { AppError } from '@/errors/app-error';

export class GetOrderByIdUseCase {
  constructor(private ordersRepository: IOrdersRepository) {}

  async execute(id: string) {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found', 404);
    }

    return order;
  }
}
