import { randomUUID } from 'node:crypto';

import { Prisma, ProductsIngredients } from '@prisma/client';

import { IProductsIngredientsRepository } from '../products-ingredients-repository';

export class InMemoryProductsIngredientsRepository
  implements IProductsIngredientsRepository
{
  public productsIngredients: ProductsIngredients[] = [];

  async create(
    data: Prisma.ProductsIngredientsUncheckedCreateInput,
  ): Promise<void> {
    this.productsIngredients.push({
      id: data.id ?? randomUUID(),
      ingredientId: data.ingredientId,
      productId: data.productId,
    });
  }

  async createMany(
    data: Prisma.ProductsIngredientsUncheckedCreateInput[],
  ): Promise<void> {
    data.forEach(productIngredient => {
      this.productsIngredients.push({
        id: productIngredient.id ?? randomUUID(),
        ingredientId: productIngredient.ingredientId,
        productId: productIngredient.productId,
      });
    });
  }
}
