import { randomUUID } from 'node:crypto';

import { Ingredient, Prisma } from '@prisma/client';

import { IIngredientsRepository } from '../ingredients-repository';

export class InMemoryIngredientsRepository implements IIngredientsRepository {
  public ingredients: Ingredient[] = [];

  async findAll(): Promise<Ingredient[] | null> {
    return this.ingredients;
  }

  async findById(id: string): Promise<Ingredient | null> {
    const ingredient = this.ingredients.find(
      ingredient => ingredient.id === id,
    );

    if (!ingredient) {
      return null;
    }

    return ingredient;
  }

  async findByName(name: string): Promise<Ingredient | null> {
    const ingredient = this.ingredients.find(
      ingredient => ingredient.name === name,
    );

    if (!ingredient) {
      return null;
    }

    return ingredient;
  }

  async create(data: Prisma.IngredientCreateInput): Promise<Ingredient> {
    const ingredient: Ingredient = {
      id: data.id ?? randomUUID(),
      name: data.name,
      emoji: data.emoji,
    };

    this.ingredients.push(ingredient);

    return ingredient;
  }
}
