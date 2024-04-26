import { Request, Response } from 'express';
import z from 'zod';

import { makeGetOrderByIdUseCase } from '@/use-cases/orders/factories/make-get-order-by-id-use-case';

export class GetOrderByIdController {
  async handle(request: Request, response: Response) {
    const getOrderByIdParamsSchema = z.object({
      orderId: z.string().cuid().or(z.string().uuid()),
    });

    const { orderId } = getOrderByIdParamsSchema.parse(request.params);

    const getOrderByIdUseCase = makeGetOrderByIdUseCase();

    const order = await getOrderByIdUseCase.execute(orderId);

    return response.json(order);
  }
}
