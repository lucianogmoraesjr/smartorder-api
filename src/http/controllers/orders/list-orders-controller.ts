import { Request, Response } from 'express';

import { makeListOrdersUseCase } from '@/use-cases/orders/factories/make-list-orders-use-case';

export class ListOrdersController {
  async handle(request: Request, response: Response) {
    const listOrdersUseCase = makeListOrdersUseCase();

    const orders = await listOrdersUseCase.execute();

    return response.json(orders);
  }
}
