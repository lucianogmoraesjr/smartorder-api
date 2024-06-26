import { Product } from '@prisma/client';

import { IProductsRepository } from '../products-repository';

import { PrismaProductDetailsMapper } from './mappers/prisma-product-details-mapper';

import {
  ICreateProductDTO,
  IUpdateProductDTO,
} from '@/dtos/create-product-dto';
import { IProductDetails } from '@/entities/product-details';
import { prisma } from '@/lib/prisma';

export class PrismaProductsRepository implements IProductsRepository {
  async findAll(): Promise<Product[] | null> {
    const products = await prisma.product.findMany({
      orderBy: {
        name: 'asc',
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
            emoji: true,
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
        category: {
          select: {
            name: true,
            emoji: true,
          },
        },
      },
    });

    if (!products) {
      return null;
    }

    return products;
  }

  async findById(id: string): Promise<IProductDetails | null> {
    const product = await prisma.product.findUnique({
      where: {
        id,
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

    if (!product) {
      return null;
    }

    return PrismaProductDetailsMapper.toDomain(product);
  }

  async findByName(name: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: {
        name,
      },
    });

    if (!product) {
      return null;
    }

    return product;
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
            emoji: true,
          },
        },
      },
    });

    return product;
  }

  async update(data: IUpdateProductDTO): Promise<Product> {
    const updatedProduct = await prisma.product.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        description: data.description,
        priceInCents: data.priceInCents,
        imagePath: data.imagePath,
        categoryId: data.categoryId,
        ingredients: {
          deleteMany: {
            productId: data.id,
          },
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
            emoji: true,
          },
        },
      },
    });

    return updatedProduct;
  }

  async delete(id: string): Promise<void> {
    await prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
