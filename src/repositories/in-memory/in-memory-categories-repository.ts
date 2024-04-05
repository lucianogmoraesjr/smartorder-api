import { randomUUID } from 'node:crypto';

import { Category, Prisma } from '@prisma/client';

import { ICategoriesRepository } from '../categories-repository';

export class InMemoryCategoriesRepository implements ICategoriesRepository {
  public categories: Category[] = [];

  async findAll(): Promise<Category[] | null> {
    return this.categories;
  }

  async findById(id: string): Promise<Category | null> {
    const category = this.categories.find(category => category.id === id);

    if (!category) {
      return null;
    }

    return category;
  }

  async findByName(name: string): Promise<Category | null> {
    const category = this.categories.find(category => category.name === name);

    if (!category) {
      return null;
    }

    return category;
  }

  async create(data: Prisma.CategoryCreateInput): Promise<Category> {
    const category = {
      id: data.id ?? randomUUID(),
      name: data.name,
      emoji: data.emoji,
    };

    this.categories.push(category);

    return category;
  }

  async update({
    id,
    name,
    emoji,
  }: Prisma.CategoryCreateInput): Promise<Category> {
    const categoryIndex = this.categories.findIndex(
      category => category.id === id,
    );

    const category = this.categories[categoryIndex];

    const updatedCategory = {
      id: category.id,
      name,
      emoji,
    };

    this.categories[categoryIndex] = updatedCategory;

    return updatedCategory;
  }
}
