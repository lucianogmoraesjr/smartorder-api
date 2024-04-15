import { Request, Response } from 'express';
import z from 'zod';

import { makeUpdateProductUseCase } from '@/use-cases/products/factories/make-update-product-use-case';

export class UpdateProductController {
  async handle(request: Request, response: Response) {
    const updateProductBodySchema = z.object({
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

    const updateProductParamsSchema = z.object({
      productId: z.string().cuid().or(z.string().uuid()),
    });

    const { productId } = updateProductParamsSchema.parse(request.params);

    const { name, description, priceInCents, ingredients, categoryId } =
      updateProductBodySchema.parse(request.body);

    const imagePath = request.file?.filename;

    const updateProductUseCase = makeUpdateProductUseCase();

    const parsedIngredients =
      typeof ingredients === 'string' ? JSON.parse(ingredients) : ingredients;

    const product = await updateProductUseCase.execute({
      id: productId,
      name,
      description,
      priceInCents: priceInCents,
      imagePath: imagePath || '',
      categoryId,
      ingredients: parsedIngredients || [],
    });

    return response.status(200).json(product);
  }
}
