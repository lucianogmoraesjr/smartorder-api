import { Category, Prisma } from '@prisma/client';

import { ICategoriesRepository } from '../categories-repository';

import { prisma } from '@/lib/prisma';

export class PrismaCategoriesRepository implements ICategoriesRepository {
  async findAll(): Promise<Category[] | null> {
    const categories = await prisma.category.findMany();

    return categories;
  }

  async findByName(name: string): Promise<Category | null> {
    const category = await prisma.category.findUnique({
      where: {
        name,
      },
    });

    if (!category) {
      return null;
    }

    return category;
  }

  async create(data: Prisma.CategoryCreateInput): Promise<Category> {
    const category = await prisma.category.create({ data });

    return category;
  }
}
