import { Ingredient } from '@prisma/client';

export class IngredientPresenter {
  static toHttp(ingredient: Ingredient) {
    return {
      id: ingredient.id,
      emoji: ingredient.emoji,
      name: ingredient.name,
    };
  }
}
