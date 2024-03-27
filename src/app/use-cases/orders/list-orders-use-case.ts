import { OrdersRepository } from '../../repositories/orders-repository';

export class ListOrdersUseCase {
  private ordersRepository: OrdersRepository;

  constructor() {
    this.ordersRepository = new OrdersRepository();
  }

  async execute() {
    const orders = await this.ordersRepository.findAll();

    return orders;
  }
}
