import { Request, Response } from 'express';
import z from 'zod';

import { makeDeleteCategoryUseCase } from '@/use-cases/categories/factories/make-delete-category-use-case';

export class DeleteCategoryController {
  async handle(request: Request, response: Response) {
    const deleteCategoryParamsSchema = z.object({
      categoryId: z.string().cuid().or(z.string().uuid()),
    });

    const { categoryId } = deleteCategoryParamsSchema.parse(request.params);

    const createCategoryUseCase = makeDeleteCategoryUseCase();

    await createCategoryUseCase.execute(categoryId);

    return response.sendStatus(204);
  }
}
