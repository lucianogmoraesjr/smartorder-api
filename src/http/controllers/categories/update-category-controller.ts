import { Request, Response } from 'express';
import z from 'zod';

import { makeUpdateCategoryUseCase } from '@/use-cases/categories/factories/make-update-category-use-case';

export class UpdateCategoryController {
  async handle(request: Request, response: Response) {
    const updateCategoryParamsSchema = z.object({
      categoryId: z.string().cuid().or(z.string().uuid()),
    });

    const updateCategoryBodySchema = z.object({
      name: z.string(),
      emoji: z.string().emoji(),
    });

    const { categoryId } = updateCategoryParamsSchema.parse(request.params);

    const { name, emoji } = updateCategoryBodySchema.parse(request.body);

    const createCategoryUseCase = makeUpdateCategoryUseCase();

    const category = await createCategoryUseCase.execute({
      id: categoryId,
      name,
      emoji,
    });

    return response.status(200).json(category);
  }
}
