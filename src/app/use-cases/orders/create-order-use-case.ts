import { io } from '../../..';
import { ICreateOrderDTO } from '../../dtos/create-order-dto';
import { OrdersRepository } from '../../repositories/orders-repository';

export class CreateOrderUseCase {
  private ordersRepository: OrdersRepository;

  constructor() {
    this.ordersRepository = new OrdersRepository();
  }

  async execute(data: ICreateOrderDTO) {
    const order = await this.ordersRepository.create(data);

    const newOrder = await order.populate('products.product');

    io.emit('orders@new', newOrder);

    return order;
  }
}
