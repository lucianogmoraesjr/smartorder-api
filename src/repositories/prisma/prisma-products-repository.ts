import { Product } from '@prisma/client';

import { IProductsRepository } from '../iproducts-repository';
import { IProductsIngredientsRepository } from '../products-ingredients-repository';

import { ICreateProductDTO } from '@/dtos/create-product-dto';
import { prisma } from '@/lib/prisma';

export class PrismaProductsRepository implements IProductsRepository {
  constructor(
    private productsIngredientsRepository: IProductsIngredientsRepository,
  ) {}

  async findAll(): Promise<Product[] | null> {
    const products = await prisma.product.findMany({
      include: {
        ingredients: {
          select: {
            ingredient: true,
          },
        },
      },
    });

    if (!products) {
      return null;
    }

    return products;
  }

  async findAllByCategory(categoryId: string): Promise<Product[] | null> {
    const products = await prisma.product.findMany({
      where: {
        categoryId,
      },
      include: {
        ingredients: {
          select: {
            ingredient: true,
          },
        },
      },
    });

    if (!products) {
      return null;
    }

    return products;
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
