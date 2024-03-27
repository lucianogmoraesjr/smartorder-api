import { Request, Response } from 'express';

import { ListOrdersUseCase } from '../../use-cases/orders/list-orders-use-case';

export class ListOrdersController {
  async handle(request: Request, response: Response) {
    const listOrdersUseCase = new ListOrdersUseCase();

    const categories = await listOrdersUseCase.execute();

    return response.json(categories);
  }
}
