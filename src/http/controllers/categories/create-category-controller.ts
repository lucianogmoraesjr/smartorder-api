import { Request, Response } from 'express';
import z from 'zod';

import { makeCreateCategoryUseCase } from '@/use-cases/categories/factories/make-create-category-use-case';

export class CreateCategoryController {
  async handle(request: Request, response: Response) {
    const createCategoryBodySchema = z.object({
      name: z.string(),
      emoji: z.string().emoji(),
    });

    const { name, emoji } = createCategoryBodySchema.parse(request.body);

    const createCategoryUseCase = makeCreateCategoryUseCase();

    const category = await createCategoryUseCase.execute({ name, emoji });

    return response.status(201).json(category);
  }
}
