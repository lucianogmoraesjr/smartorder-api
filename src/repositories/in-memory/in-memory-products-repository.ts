import { randomUUID } from 'node:crypto';

import { Prisma, Product } from '@prisma/client';

import { IProductsRepository } from '../iproducts-repository';

export class InMemoryProductsRepository implements IProductsRepository {
  public products: Product[] = [];

  async findAll(): Promise<Product[] | null> {
    return this.products;
  }

  async findAllByCategory(categoryId: string): Promise<Product[] | null> {
    return this.products.filter(product => product.categoryId === categoryId);
  }

  async create(data: Prisma.ProductUncheckedCreateInput): Promise<Product> {
    const product = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      imagePath: data.imagePath,
      categoryId: data.categoryId,
    };

    this.products.push(product);

    return product;
  }
}
