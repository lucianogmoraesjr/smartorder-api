import { Ingredient, Prisma } from '@prisma/client';

export interface IIngredientsRepository {
  findAll(): Promise<Ingredient[] | null>;
  findById(id: string): Promise<Ingredient | null>;
  findByName(name: string): Promise<Ingredient | null>;
  create(data: Prisma.IngredientCreateInput): Promise<Ingredient>;
}
