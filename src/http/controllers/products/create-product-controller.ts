import { Request, Response } from 'express';
import z from 'zod';

import { makeCreateProductUseCase } from '@/use-cases/products/factories/make-create-product-use-case';

export class CreateProductController {
  async handle(request: Request, response: Response) {
    const createProductBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      priceInCents: z.coerce.number(),
      imagePath: z.string(),
      categoryId: z.string().cuid().or(z.string().uuid()),
      ingredients: z.array(z.string()).optional(),
    });

    const {
      name,
      description,
      priceInCents,
      imagePath,
      ingredients,
      categoryId,
    } = createProductBodySchema.parse(request.body);

    const createProductUseCase = makeCreateProductUseCase();

    const parsedIngredients = ingredients?.map(ingredient => ({
      ingredientId: ingredient,
    }));

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
