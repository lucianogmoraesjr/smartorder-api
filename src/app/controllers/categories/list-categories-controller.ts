import { Request, Response } from 'express';

import { ListCategoriesUseCase } from '../../use-cases/categories/list-categories-use-case';

export class ListCategoriesController {
  async handle(request: Request, response: Response) {
    const listCategoriesUseCase = new ListCategoriesUseCase();

    const categories = await listCategoriesUseCase.execute();

    return response.json(categories);
  }
}
