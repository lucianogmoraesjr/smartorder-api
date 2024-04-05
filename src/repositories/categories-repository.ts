import { Category, Prisma } from '@prisma/client';

export interface ICategoriesRepository {
  findAll(): Promise<Category[] | null>;
  findById(id: string): Promise<Category | null>;
  findByName(name: string): Promise<Category | null>;
  create(data: Prisma.CategoryCreateInput): Promise<Category>;
  update(data: Prisma.CategoryCreateInput): Promise<Category>;
  delete(id: string): Promise<void>;
}
