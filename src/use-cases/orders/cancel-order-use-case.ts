import { IOrdersRepository } from '@/repositories/orders-repository';

export class CancelOrderUseCase {
  constructor(private ordersRepository: IOrdersRepository) {}

  async execute(id: string) {
    await this.ordersRepository.delete(id);
  }
}
