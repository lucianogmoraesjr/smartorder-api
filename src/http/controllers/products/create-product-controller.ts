import { Request, Response } from 'express';
import z from 'zod';

import { makeCreateProductUseCase } from '@/use-cases/products/factories/make-create-product-use-case';

export class CreateProductController {
  async handle(request: Request, response: Response) {
    const createProductBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      priceInCents: z.coerce.number(),
      categoryId: z.string().cuid().or(z.string().uuid()),
      ingredients: z
        .string()
        .or(
          z.array(
            z.object({
              ingredientId: z.string().cuid().or(z.string().uuid()),
            }),
          ),
        )
        .optional(),
    });

    const imagePath = request.file?.filename;

    const { name, description, priceInCents, ingredients, categoryId } =
      createProductBodySchema.parse(request.body);

    const createProductUseCase = makeCreateProductUseCase();

    const parsedIngredients =
      typeof ingredients === 'string' ? JSON.parse(ingredients) : ingredients;

    const product = await createProductUseCase.execute({
      name,
      description,
      priceInCents: priceInCents,
      imagePath: imagePath || '',
      categoryId,
      ingredients: parsedIngredients || [],
    });

    return response.status(201).json(product);
  }
}
