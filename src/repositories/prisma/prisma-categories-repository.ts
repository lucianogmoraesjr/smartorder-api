import { Category, Prisma } from '@prisma/client';

import { ICategoriesRepository } from '../categories-repository';

import { prisma } from '@/lib/prisma';

export class PrismaCategoriesRepository implements ICategoriesRepository {
  async findAll(): Promise<Category[] | null> {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return categories;
  }

  async findById(id: string): Promise<Category | null> {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      return null;
    }

    return category;
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

  async update({
    id,
    name,
    emoji,
  }: Prisma.CategoryCreateInput): Promise<Category> {
    const category = await prisma.category.update({
      where: {
        id: id,
      },
      data: {
        name,
        emoji,
      },
    });

    return category;
  }

  async delete(id: string): Promise<void> {
    await prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
