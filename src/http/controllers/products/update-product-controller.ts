import { Request, Response } from 'express';
import z from 'zod';

import { makeUpdateProductUseCase } from '@/use-cases/products/factories/make-update-product-use-case';

export class UpdateProductController {
  async handle(request: Request, response: Response) {
    const updateProductBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      priceInCents: z.coerce.number(),
      imagePath: z.string(),
      categoryId: z.string().cuid().or(z.string().uuid()),
      ingredients: z.array(z.string()).optional(),
    });

    const updateProductParamsSchema = z.object({
      productId: z.string().cuid().or(z.string().uuid()),
    });

    const { productId } = updateProductParamsSchema.parse(request.params);

    const {
      name,
      description,
      priceInCents,
      imagePath,
      ingredients,
      categoryId,
    } = updateProductBodySchema.parse(request.body);

    const updateProductUseCase = makeUpdateProductUseCase();

    const parsedIngredients = ingredients?.map(ingredient => ({
      ingredientId: ingredient,
    }));

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
