import { Request, Response } from 'express';

import { AppError } from '../../errors/app-error';
import { CreateCategoryUseCase } from '../../use-cases/categories/create-category-use-case';

export class CreateCategoryController {
  async handle(request: Request, response: Response) {
    const { name, icon } = request.body;

    if (!name) {
      throw new AppError('Name is required');
    }

    if (!icon) {
      throw new AppError('Icon is required');
    }

    const createCategoryUseCase = new CreateCategoryUseCase();

    const category = await createCategoryUseCase.execute({ name, icon });

    return response.status(201).json(category);
  }
}
