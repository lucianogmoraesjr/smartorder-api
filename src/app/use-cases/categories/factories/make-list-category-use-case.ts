import { ListCategoriesUseCase } from '../list-categories-use-case';

import { PrismaCategoriesRepository } from '@/app/repositories/prisma/prisma-categories-repository';

export function makeListCategoriesUseCase() {
  const prismaCategoriesRepository = new PrismaCategoriesRepository();
  const listCategoriesUseCase = new ListCategoriesUseCase(
    prismaCategoriesRepository,
  );

  return listCategoriesUseCase;
}
