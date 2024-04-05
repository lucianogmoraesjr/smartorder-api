import { makeIngredient } from 'test/factories/make-ingredient';

import { CreateIngredientUseCase } from './create-ingredient-use-case';

import { AppError } from '@/errors/app-error';
import { InMemoryIngredientsRepository } from '@/repositories/in-memory/in-memory-ingredients-repository';

let inMemoryIngredientsRepository: InMemoryIngredientsRepository;
let sut: CreateIngredientUseCase;

describe('Create Ingredient Use Case', () => {
  beforeEach(() => {
    inMemoryIngredientsRepository = new InMemoryIngredientsRepository();
    sut = new CreateIngredientUseCase(inMemoryIngredientsRepository);
  });

  it('should be able to create a ingredient', async () => {
    const ingredient = await sut.execute({
      name: 'Test',
      emoji: '🧪',
    });

    expect(ingredient.id).toEqual(expect.any(String));
    expect(inMemoryIngredientsRepository.ingredients).toContainEqual(
      ingredient,
    );
  });

  it('should not be able to create a ingredient if name already exists', async () => {
    await inMemoryIngredientsRepository.create(
      makeIngredient({
        name: 'Test',
      }),
    );

    await expect(
      sut.execute({
        name: 'Test',
        emoji: '🧪',
      }),
    ).rejects.toEqual(new AppError('Ingredient already exists'));
  });
});
