import { Request, Response } from 'express';

import { makeUpdateOrderStatusUseCase } from '@/use-cases/orders/factories/make-update-order-status-use-case';

export class UpdateOrderStatusController {
  async handle(request: Request, response: Response) {
    const { status } = request.body;
    const { orderId } = request.params;

    const updateOrderStatusUseCase = makeUpdateOrderStatusUseCase();

    await updateOrderStatusUseCase.execute({
      id: orderId,
      status,
    });

    return response.sendStatus(204);
  }
}
