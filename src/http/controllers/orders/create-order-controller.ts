import { Request, Response } from 'express';

import { CreateOrderUseCase } from '../../../use-cases/orders/create-order-use-case';

export class CreateOrderController {
  async handle(request: Request, response: Response) {
    const { table, products } = request.body;

    const createOrderUseCase = new CreateOrderUseCase();

    const order = await createOrderUseCase.execute({ table, products });

    return response.json(order);
  }
}
