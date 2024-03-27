import { Request, Response } from 'express';

import { makeCreateCategoryUseCase } from '@/app/use-cases/categories/factories/make-create-category-use-case';

export class CreateCategoryController {
  async handle(request: Request, response: Response) {
    const { name, emoji } = request.body;

    const createCategoryUseCase = makeCreateCategoryUseCase();

    const category = await createCategoryUseCase.execute({ name, emoji });

    return response.status(201).json(category);
  }
}
