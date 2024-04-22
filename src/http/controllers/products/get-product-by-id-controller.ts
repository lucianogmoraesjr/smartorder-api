import { Request, Response } from 'express';
import z from 'zod';

import { ImagePathPresenter } from '@/http/presenters/image-path-presenter';
import { makeGetProductByIdUseCase } from '@/use-cases/products/factories/make-get-product-by-id-use-case';

export class GetProductByIdController {
  async handle(request: Request, response: Response) {
    const getProductByIdParamsSchema = z.object({
      productId: z.string().cuid().or(z.string().uuid()),
    });

    const { productId } = getProductByIdParamsSchema.parse(request.params);

    const getProductByIdUseCase = makeGetProductByIdUseCase();

    const product = await getProductByIdUseCase.execute(productId);

    return response.status(200).json({
      ...product,
      imagePath: ImagePathPresenter.toHttp(product.imagePath),
    });
  }
}
