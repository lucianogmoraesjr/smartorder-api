import { AppError } from '../../errors/app-error';
import {
  IOrdersRepository,
  IUpdateStatusRequest,
} from '../../repositories/orders-repository';

export class UpdateOrderStatusUseCase {
  constructor(private ordersRepository: IOrdersRepository) {}

  async execute(data: IUpdateStatusRequest) {
    const orderExists = await this.ordersRepository.findById(data.id);

    if (!orderExists) {
      throw new AppError('Order not found', 404);
    }

    await this.ordersRepository.updateStatus(data);
  }
}
