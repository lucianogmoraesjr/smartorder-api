import { ListIngredientsUseCase } from '../list-ingredients-use-case';

import { PrismaIngredientsRepository } from '@/repositories/prisma/prisma-ingredients-repository';

export function makeListIngredientsUseCase() {
  const prismaIngredientsRepository = new PrismaIngredientsRepository();
  const listIngredientsUseCase = new ListIngredientsUseCase(
    prismaIngredientsRepository,
  );

  return listIngredientsUseCase;
}
