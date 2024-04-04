import { Request, Response } from 'express';
import z from 'zod';

import { makeCancelOrderUseCase } from '@/use-cases/orders/factories/make-cancel-order-use-case';

export class CancelOrderController {
  async handle(request: Request, response: Response) {
    const cancelOrderParamsSchema = z.object({
      orderId: z.string().cuid().or(z.string().uuid()),
    });

    const { orderId } = cancelOrderParamsSchema.parse(request.params);

    const cancelOrderUseCase = makeCancelOrderUseCase();

    await cancelOrderUseCase.execute(orderId);

    return response.sendStatus(204);
  }
}
