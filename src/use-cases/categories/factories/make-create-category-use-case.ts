import { CreateCategoryUseCase } from '../create-category-use-case';

import { PrismaCategoriesRepository } from '@/repositories/prisma/prisma-categories-repository';

export function makeCreateCategoryUseCase() {
  const prismaCategoriesRepository = new PrismaCategoriesRepository();
  const createCategoryUseCase = new CreateCategoryUseCase(
    prismaCategoriesRepository,
  );

  return createCategoryUseCase;
}
