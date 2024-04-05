import { Category, Prisma } from '@prisma/client';

export type CategoryUpdateInput = {
  id: string;
  name: string;
  emoji: string;
};

export interface ICategoriesRepository {
  findAll(): Promise<Category[] | null>;
  findById(id: string): Promise<Category | null>;
  findByName(name: string): Promise<Category | null>;
  create(data: Prisma.CategoryCreateInput): Promise<Category>;
  update(data: CategoryUpdateInput): Promise<Category>;
}
