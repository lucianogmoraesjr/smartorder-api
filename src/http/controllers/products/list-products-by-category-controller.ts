import { Request, Response } from 'express';
import z from 'zod';

import { makeListProductsByCategoryUseCase } from '@/use-cases/products/factories/make-list-products-by-category-use-case';

export class ListProductsByCategoryController {
  async handle(request: Request, response: Response) {
    const listProductsParamsSchema = z.object({
      categoryId: z.string().cuid().or(z.string().uuid()),
    });

    const { categoryId } = listProductsParamsSchema.parse(request.params);

    const listProductsByCategoryUseCase = makeListProductsByCategoryUseCase();

    const categories = await listProductsByCategoryUseCase.execute(categoryId);

    return response.json(categories);
  }
}
