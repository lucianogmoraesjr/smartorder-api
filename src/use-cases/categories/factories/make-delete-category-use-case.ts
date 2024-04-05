import { DeleteCategoryUseCase } from '../delete-category-use-case';

import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository';

export function makeDeleteCategoryUseCase() {
  const prismaCategoriesRepository = new PrismaCategoriesRepository();
  const deleteCategoryUseCase = new DeleteCategoryUseCase(
    prismaCategoriesRepository,
  );

  return deleteCategoryUseCase;
}
