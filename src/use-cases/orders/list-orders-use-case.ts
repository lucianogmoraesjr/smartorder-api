import { IOrdersRepository } from '../../repositories/orders-repository';

export class ListOrdersUseCase {
  constructor(private ordersRepository: IOrdersRepository) {}

  async execute() {
    const orders = await this.ordersRepository.findAll();

    return orders;
  }
}
