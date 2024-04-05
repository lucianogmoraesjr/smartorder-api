import { Request, Response } from 'express';

import { makeListIngredientsUseCase } from '@/use-cases/ingredients/factories/make-list-ingredients-use-case';

export class ListIngredientsController {
  async handle(request: Request, response: Response) {
    const listIngredientsUseCase = makeListIngredientsUseCase();

    const ingredients = await listIngredientsUseCase.execute();

    return response.json(ingredients);
  }
}
