import { Request, Response } from 'express';

import { makeListProductsByCategoryUseCase } from '@/use-cases/products/factories/make-list-products-by-category-use-case';

export class ListProductsByCategoryController {
  async handle(request: Request, response: Response) {
    const { categoryId } = request.params;

    const listProductsByCategoryUseCase = makeListProductsByCategoryUseCase();

    const categories = await listProductsByCategoryUseCase.execute(categoryId);

    return response.json(categories);
  }
}
