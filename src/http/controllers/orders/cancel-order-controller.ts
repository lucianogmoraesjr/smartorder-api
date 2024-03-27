import { Request, Response } from 'express';

import { CancelOrderUseCase } from '../../use-cases/orders/cancel-order-use-case';

export class CancelOrderController {
  async handle(request: Request, response: Response) {
    const { orderId } = request.params;

    const cancelOrderUseCase = new CancelOrderUseCase();

    await cancelOrderUseCase.execute(orderId);

    return response.sendStatus(204);
  }
}
