import { randomUUID } from 'node:crypto';

import { Product } from '@prisma/client';

import { IProductsRepository } from '../iproducts-repository';

import { ICreateProductDTO } from '@/dtos/create-product-dto';

type InMemoryProduct = Product & {
  ingredients?: Array<{
    ingredientId: string;
  }>;
};

export class InMemoryProductsRepository implements IProductsRepository {
  public products: InMemoryProduct[] = [];

  async findAll(): Promise<Product[] | null> {
    return this.products;
  }

  async findAllByCategory(categoryId: string): Promise<Product[] | null> {
    return this.products.filter(product => product.categoryId === categoryId);
  }

  async create(data: ICreateProductDTO): Promise<Product> {
    const product: InMemoryProduct = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      imagePath: data.imagePath,
      categoryId: data.categoryId,
      ingredients: data.ingredients,
    };

    this.products.push(product);

    return product;
  }
}
