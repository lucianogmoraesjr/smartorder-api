import { Request, Response } from 'express';
import z from 'zod';

import { makeArchiveRecentOrdersUseCase } from '@/use-cases/history/factories/make-archive-recent-orders-use-case';

export class ArchiveRecentOrdersController {
  async handle(request: Request, response: Response) {
    const archiveRecentOrdersBodySchema = z.object({
      orderIds: z.array(z.string().cuid().or(z.string().uuid())),
    });

    const { orderIds } = archiveRecentOrdersBodySchema.parse(request.body);

    const archiveRecentOrdersUseCase = makeArchiveRecentOrdersUseCase();

    await archiveRecentOrdersUseCase.execute(orderIds);

    return response.sendStatus(204);
  }
}
