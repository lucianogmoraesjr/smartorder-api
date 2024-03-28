import { Product } from '@prisma/client';

import { IProductsRepository } from '../iproducts-repository';
import { IProductsIngredients } from '../products-ingredients-repository';

import { ICreateProductDTO } from '@/dtos/create-product-dto';
import { prisma } from '@/lib/prisma';

export class PrismaProductsRepository implements IProductsRepository {
  constructor(private productsIngredientsRepository: IProductsIngredients) {}

  findAll(): Promise<Product[] | null> {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findAllByCategory(categoryId: string): Promise<Product[] | null> {
    throw new Error('Method not implemented.');
  }

  async create(data: ICreateProductDTO): Promise<Product> {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        priceInCents: data.priceInCents,
        imagePath: data.imagePath,
        categoryId: data.categoryId,
      },
    });

    const ingredients = data.ingredients.map(ingredient => {
      return {
        ingredientId: ingredient.ingredientId,
        productId: product.id,
      };
    });

    await this.productsIngredientsRepository.createMany(ingredients);

    return product;
  }
}
