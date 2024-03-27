import { Request, Response } from 'express';

import { makeListCategoriesUseCase } from '@/app/use-cases/categories/factories/make-list-category-use-case';

export class ListCategoriesController {
  async handle(request: Request, response: Response) {
    const listCategoriesUseCase = makeListCategoriesUseCase();

    const categories = await listCategoriesUseCase.execute();

    return response.json(categories);
  }
}
