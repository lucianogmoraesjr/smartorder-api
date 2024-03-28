import { randomUUID } from 'node:crypto';

import { Product } from '@prisma/client';

import { IProductsRepository } from '../iproducts-repository';
import { IProductsIngredientsRepository } from '../products-ingredients-repository';

import { ICreateProductDTO } from '@/dtos/create-product-dto';

export class InMemoryProductsRepository implements IProductsRepository {
  public products: Product[] = [];

  constructor(
    private productsIngredientsRepository: IProductsIngredientsRepository,
  ) {}

  async findAll(): Promise<Product[] | null> {
    return this.products;
  }

  async findAllByCategory(categoryId: string): Promise<Product[] | null> {
    return this.products.filter(product => product.categoryId === categoryId);
  }

  async create(data: ICreateProductDTO): Promise<Product> {
    const product = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      imagePath: data.imagePath,
      categoryId: data.categoryId,
    };

    this.products.push(product);

    const ingredients = data.ingredients.map(ingredient => {
      return {
        ingredientId: ingredient.ingredientId,
        productId: product.id,
      };
    });

    this.productsIngredientsRepository.createMany(ingredients);

    return product;
  }
}
