import { GetCategoryByIdUseCase } from '../get-category-by-id-use-case';

import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository';

export function makeGetCategoryByIdUseCase() {
  const prismaCategoriesRepository = new PrismaCategoriesRepository();
  const getCategoryByIdUseCase = new GetCategoryByIdUseCase(
    prismaCategoriesRepository,
  );

  return getCategoryByIdUseCase;
}
