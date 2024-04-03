import { Request, Response } from 'express';

import { makeListProductsUseCase } from '@/use-cases/products/factories/make-list-products-use-case';

export class ListProductsController {
  async handle(request: Request, response: Response) {
    const listProductsUseCase = makeListProductsUseCase();

    const products = await listProductsUseCase.execute();

    return response.json(products);
  }
}
