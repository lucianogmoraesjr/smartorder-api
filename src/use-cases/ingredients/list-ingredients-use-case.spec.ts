import { ListIngredientsUseCase } from './list-ingredients-use-case';

import { InMemoryIngredientsRepository } from '@/repositories/in-memory/in-memory-ingredients-repository';

let inMemoryIngredientsRepository: InMemoryIngredientsRepository;
let sut: ListIngredientsUseCase;

describe('List Ingredients Use Case', () => {
  beforeEach(() => {
    inMemoryIngredientsRepository = new InMemoryIngredientsRepository();
    sut = new ListIngredientsUseCase(inMemoryIngredientsRepository);
  });

  it('should be able to list all ingredients', async () => {
    await inMemoryIngredientsRepository.create({
      name: 'ingredient-1',
      emoji: '🧪',
    });

    await inMemoryIngredientsRepository.create({
      name: 'ingredient-2',
      emoji: '🧪',
    });

    const ingredients = await sut.execute();

    expect(ingredients).toHaveLength(2);
    expect(ingredients).toEqual([
      expect.objectContaining({ name: 'ingredient-1' }),
      expect.objectContaining({ name: 'ingredient-2' }),
    ]);
  });
});
