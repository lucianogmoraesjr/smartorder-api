import { UpdateCategoryUseCase } from '../update-category-use-case';

import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository';

export function makeUpdateCategoryUseCase() {
  const prismaCategoriesRepository = new PrismaCategoriesRepository();
  const updateCategoryUseCase = new UpdateCategoryUseCase(
    prismaCategoriesRepository,
  );

  return updateCategoryUseCase;
}
