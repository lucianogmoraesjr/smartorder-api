import { Request, Response } from 'express';
import z from 'zod';

import { makeCreateIngredientUseCase } from '@/use-cases/ingredients/factories/make-create-ingredient-use-case';

export class CreateIngredientController {
  async handle(request: Request, response: Response) {
    const createIngredientBodySchema = z.object({
      name: z.string(),
      emoji: z.string().emoji(),
    });

    const { name, emoji } = createIngredientBodySchema.parse(request.body);

    const createIngredientUseCase = makeCreateIngredientUseCase();

    const ingredient = await createIngredientUseCase.execute({
      name,
      emoji,
    });

    return response.status(201).json(ingredient);
  }
}
