import { Category } from '@prisma/client';

export class CategoryPresenter {
  static toHttp(category: Category | null) {
    return {
      id: category?.id,
      emoji: category?.emoji,
      name: category?.name,
    };
  }
}
