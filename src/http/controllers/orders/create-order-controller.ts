import { Request, Response } from 'express';
import z from 'zod';

import { makeCreateOrderUseCase } from '@/use-cases/orders/factories/make-create-order-use-case';

export class CreateOrderController {
  async handle(request: Request, response: Response) {
    const createOrderBodySchema = z.object({
      table: z.number(),
      products: z.array(
        z.object({
          productId: z.string().cuid().or(z.string().uuid()),
          quantity: z.number().min(1),
        }),
      ),
    });

    const { table, products } = createOrderBodySchema.parse(request.body);

    const createOrderUseCase = makeCreateOrderUseCase();

    const order = await createOrderUseCase.execute({ table, products });

    return response.status(201).json(order);
  }
}
