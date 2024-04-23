import { Request, Response } from 'express';

import { makeListArchivedOrdersUseCase } from '@/use-cases/history/factories/make-list-archived-orders-use-case';

export class ListArchivedOrdersController {
  async handle(request: Request, response: Response) {
    const listArchivedOrdersUseCase = makeListArchivedOrdersUseCase();

    const archivedOrders = await listArchivedOrdersUseCase.execute();

    return response.status(200).json(archivedOrders);
  }
}
