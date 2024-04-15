import { randomUUID } from 'node:crypto';

import { Product } from '@prisma/client';

import { IProductsRepository } from '../products-repository';

import {
  ICreateProductDTO,
  IUpdateProductDTO,
} from '@/dtos/create-product-dto';

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

  async findById(id: string): Promise<Product | null> {
    const product = this.products.find(product => product.id === id);

    if (!product) {
      return null;
    }

    return product;
  }

  async findByName(name: string): Promise<Product | null> {
    const product = this.products.find(product => product.name === name);

    if (!product) {
      return null;
    }

    return product;
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

  async update(data: IUpdateProductDTO): Promise<Product> {
    const productIndex = this.products.findIndex(
      product => product.id === data.id,
    );

    const updatedProduct = {
      ...data,
    };

    this.products[productIndex] = updatedProduct;

    return updatedProduct;
  }

  async delete(id: string): Promise<void> {
    const productIndex = this.products.findIndex(product => product.id === id);

    this.products.splice(productIndex, 1);
  }
}
