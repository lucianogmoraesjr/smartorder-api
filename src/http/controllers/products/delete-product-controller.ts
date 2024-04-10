import { Request, Response } from 'express';
import z from 'zod';

import { makeDeleteProductUseCase } from '@/use-cases/products/factories/make-delete-product-use-case';

export class DeleteProductController {
  async handle(request: Request, response: Response) {
    const deleteProductParamsSchema = z.object({
      productId: z.string().cuid().or(z.string().uuid()),
    });

    const { productId } = deleteProductParamsSchema.parse(request.params);

    const deleteProductUseCase = makeDeleteProductUseCase();

    await deleteProductUseCase.execute(productId);

    return response.sendStatus(204);
  }
}
