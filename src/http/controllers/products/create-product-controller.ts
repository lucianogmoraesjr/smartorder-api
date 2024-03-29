import { Request, Response } from 'express';

import { makeCreateProductUseCase } from '@/use-cases/products/factories/make-create-product-use-case';

export class CreateProductController {
  async handle(request: Request, response: Response) {
    const imagePath = request.file?.filename;
    const { name, description, priceInCents, ingredients, categoryId } =
      request.body;

    const createProductUseCase = makeCreateProductUseCase();

    const product = await createProductUseCase.execute({
      name,
      description,
      priceInCents: Number(priceInCents),
      imagePath: imagePath || '',
      categoryId,
      ingredients: ingredients || [],
    });

    return response.status(201).json(product);
  }
}
