import { makeCategory } from 'test/factories/make-category';

import { UpdateCategoryUseCase } from './update-category-use-case';

import { AppError } from '@/errors/app-error';
import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository';

let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let sut: UpdateCategoryUseCase;

describe('Update Category Use Case', () => {
  beforeEach(async () => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    sut = new UpdateCategoryUseCase(inMemoryCategoriesRepository);
  });

  it('should be able to update a category', async () => {
    const category = await inMemoryCategoriesRepository.create(
      makeCategory({
        name: 'Pizzas',
        emoji: '🍕',
      }),
    );

    await sut.execute({
      id: category.id,
      name: 'Pizza',
      emoji: '🍕',
    });

    expect(inMemoryCategoriesRepository.categories).toEqual([
      expect.objectContaining({
        name: 'Pizza',
        emoji: '🍕',
      }),
    ]);
  });

  it('should not be able to update a non-existing category', async () => {
    await expect(
      sut.execute({
        id: 'non-existing-id',
        name: 'Pizza',
        emoji: '🍕',
      }),
    ).rejects.toEqual(new AppError('Category not found', 404));
  });
});
