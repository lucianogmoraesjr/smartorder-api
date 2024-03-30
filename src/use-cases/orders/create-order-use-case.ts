import { ICreateOrderDTO } from '../../dtos/create-order-dto';
import { IOrdersRepository } from '../../repositories/orders-repository';

import { io } from '@/app';

export class CreateOrderUseCase {
  constructor(private ordersRepository: IOrdersRepository) {}

  async execute(data: ICreateOrderDTO) {
    const order = await this.ordersRepository.create(data);

    io.emit('orders@new', order);

    return order;
  }
}
