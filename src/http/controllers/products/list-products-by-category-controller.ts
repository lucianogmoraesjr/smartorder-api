import { Request, Response } from 'express';

import { ListProductsByCategoryUseCase } from '../../use-cases/products/list-products-by-category-use-case';

export class ListProductsByCategoryController {
  async handle(request: Request, response: Response) {
    const { categoryId } = request.params;

    const listProductsByCategoryUseCase = new ListProductsByCategoryUseCase();

    const categories = await listProductsByCategoryUseCase.execute(categoryId);

    return response.json(categories);
  }
}
