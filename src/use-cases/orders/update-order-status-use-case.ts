import { AppError } from '../../errors/app-error';
import {
  IOrdersRepository,
  IUpdateStatusRequest,
} from '../../repositories/orders-repository';

export class UpdateOrderStatusUseCase {
  constructor(private ordersRepository: IOrdersRepository) {}

  async execute(data: IUpdateStatusRequest) {
    if (!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(data.status)) {
      throw new AppError(
        'Status should be one of these: WAITING, IN_PRODUCTION, DONE.',
      );
    }

    await this.ordersRepository.updateStatus(data);
  }
}
