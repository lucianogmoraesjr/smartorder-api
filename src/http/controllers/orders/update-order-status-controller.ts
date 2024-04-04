import { Request, Response } from 'express';
import z from 'zod';

import { makeUpdateOrderStatusUseCase } from '@/use-cases/orders/factories/make-update-order-status-use-case';

export class UpdateOrderStatusController {
  async handle(request: Request, response: Response) {
    const updateOrderStatusParamsSchema = z.object({
      orderId: z.string().cuid().or(z.string().uuid()),
    });

    const updateOrderStatusBodySchema = z.object({
      status: z.enum(['WAITING', 'IN_PRODUCTION', 'DONE']),
    });

    const { status } = updateOrderStatusBodySchema.parse(request.body);
    const { orderId } = updateOrderStatusParamsSchema.parse(request.params);

    const updateOrderStatusUseCase = makeUpdateOrderStatusUseCase();

    await updateOrderStatusUseCase.execute({
      id: orderId,
      status,
    });

    return response.sendStatus(204);
  }
}
