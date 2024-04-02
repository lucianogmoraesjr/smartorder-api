import { Product } from '@prisma/client';

import { IProductsRepository } from '../products-repository';

import { ICreateProductDTO } from '@/dtos/create-product-dto';
import { prisma } from '@/lib/prisma';

export class PrismaProductsRepository implements IProductsRepository {
  async findAll(): Promise<Product[] | null> {
    const products = await prisma.product.findMany({
      include: {
        ingredients: {
          select: {
            ingredient: true,
          },
        },
        category: {
          select: {
            name: true,
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
        category: true,
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
        ingredients: {
          create: data.ingredients?.map(ingredient => ({
            ingredient: {
              connect: { id: ingredient.ingredientId },
            },
          })),
        },
      },
      include: {
        ingredients: {
          select: {
            ingredient: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    return product;
  }
}
