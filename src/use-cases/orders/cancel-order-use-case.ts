import { OrdersRepository } from '../../repositories/orders-repository';

export class CancelOrderUseCase {
  private ordersRepository: OrdersRepository;

  constructor() {
    this.ordersRepository = new OrdersRepository();
  }

  async execute(id: string) {
    await this.ordersRepository.delete(id);
  }
}
