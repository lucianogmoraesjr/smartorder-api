import { Category, Prisma } from '@prisma/client';

import { ICategoriesRepository } from '../categories-repository';

import { prisma } from '@/lib/prisma';

export class PrismaCategoriesRepository implements ICategoriesRepository {
  async findAll(): Promise<Category[] | null> {
    const categories = await prisma.category.findMany();

    return categories;
  }

  findByName(): Promise<{ id: string; name: string; emoji: string } | null> {
    throw new Error('Method not implemented.');
  }

  async create(data: Prisma.CategoryCreateInput): Promise<Category> {
    const category = await prisma.category.create({ data });

    return category;
  }
}
