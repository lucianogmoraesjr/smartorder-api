import { Request, Response } from 'express';

import { CreateProductUseCase } from '../../use-cases/products/create-product-use-case';

export class CreateProductController {
  async handle(request: Request, response: Response) {
    const imagePath = request.file?.filename;
    const { name, description, price, ingredients, category } = request.body;

    const createProductUseCase = new CreateProductUseCase();

    const product = await createProductUseCase.execute({
      name,
      description,
      price: Number(price),
      ingredients: ingredients ? JSON.parse(ingredients) : [],
      imagePath: imagePath || '',
      category,
    });

    return response.status(201).json(product);
  }
}
