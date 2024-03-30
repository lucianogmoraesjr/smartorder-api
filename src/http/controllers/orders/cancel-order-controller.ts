import { Request, Response } from 'express';

import { makeCancelOrderUseCase } from '@/use-cases/orders/factories/make-cancel-order-use-case';

export class CancelOrderController {
  async handle(request: Request, response: Response) {
    const { orderId } = request.params;

    const cancelOrderUseCase = makeCancelOrderUseCase();

    await cancelOrderUseCase.execute(orderId);

    return response.sendStatus(204);
  }
}
