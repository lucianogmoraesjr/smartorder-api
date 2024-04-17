import { Request, Response } from 'express';
import z from 'zod';

import { makeGetCategoryByIdUseCase } from '@/use-cases/categories/factories/make-get-category-by-id-use-case';

export class GetCategoryByIdController {
  async handle(request: Request, response: Response) {
    const getCategoryByIdParamsSchema = z.object({
      categoryId: z.string().cuid().or(z.string().uuid()),
    });

    const { categoryId } = getCategoryByIdParamsSchema.parse(request.params);

    const getCategoryByIdUseCase = makeGetCategoryByIdUseCase();

    const category = await getCategoryByIdUseCase.execute(categoryId);

    return response.status(200).json(category);
  }
}
