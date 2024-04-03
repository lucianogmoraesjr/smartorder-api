import { Request, Response } from 'express';

import { makeCreateOrderUseCase } from '@/use-cases/orders/factories/make-create-order-use-case';

export class CreateOrderController {
  async handle(request: Request, response: Response) {
    const { table, products } = request.body;

    const createOrderUseCase = makeCreateOrderUseCase();

    const order = await createOrderUseCase.execute({ table, products });

    return response.status(201).json(order);
  }
}
