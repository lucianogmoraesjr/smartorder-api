import { Request, Response } from 'express';
import z from 'zod';

import { makeArchiveOrderUseCase } from '@/use-cases/history/factories/make-archive-order-use-case';

export class ArchiveOrderController {
  async handle(request: Request, response: Response) {
    const archiveOrderBodySchema = z.object({
      orderId: z.string().cuid().or(z.string().uuid()),
    });

    const { orderId } = archiveOrderBodySchema.parse(request.body);

    const archiveOrderUseCase = makeArchiveOrderUseCase();

    await archiveOrderUseCase.execute(orderId);

    return response.sendStatus(204);
  }
}
