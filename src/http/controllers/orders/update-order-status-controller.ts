import { Request, Response } from 'express';

import { UpdateOrderStatusUseCase } from '../../use-cases/orders/update-order-status-use-case';

export class UpdateOrderStatusController {
  async handle(request: Request, response: Response) {
    const { status } = request.body;
    const { orderId } = request.params;

    const updateOrderStatusUseCase = new UpdateOrderStatusUseCase();

    await updateOrderStatusUseCase.execute(orderId, status);

    return response.sendStatus(204);
  }
}
