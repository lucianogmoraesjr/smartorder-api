import { Request, Response } from 'express';

import { ListProductsUseCase } from '../../../use-cases/products/list-products-use-case';

export class ListProductsController {
  async handle(request: Request, response: Response) {
    const listProductsUseCase = new ListProductsUseCase();

    const products = await listProductsUseCase.execute();

    return response.json(products);
  }
}
