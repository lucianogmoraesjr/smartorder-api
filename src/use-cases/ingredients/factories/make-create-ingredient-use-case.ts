import { CreateIngredientUseCase } from '../create-ingredient-use-case';

import { PrismaIngredientsRepository } from '@/repositories/prisma/prisma-ingredients-repository';

export function makeCreateIngredientUseCase() {
  const prismaIngredientsUseCase = new PrismaIngredientsRepository();
  const createIngredientUseCase = new CreateIngredientUseCase(
    prismaIngredientsUseCase,
  );

  return createIngredientUseCase;
}
