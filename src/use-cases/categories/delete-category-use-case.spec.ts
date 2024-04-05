import { makeCategory } from 'test/factories/make-category';

import { DeleteCategoryUseCase } from './delete-category-use-case';

import { AppError } from '@/errors/app-error';
import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository';

let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let sut: DeleteCategoryUseCase;

describe('Delete Category Use Case', () => {
  beforeEach(async () => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    sut = new DeleteCategoryUseCase(inMemoryCategoriesRepository);
  });

  it('should be able to delete a category', async () => {
    const category = await inMemoryCategoriesRepository.create(
      makeCategory({
        name: 'Pizzas',
        emoji: '🍕',
      }),
    );

    await sut.execute(category.id);

    expect(inMemoryCategoriesRepository.categories).toHaveLength(0);
  });

  it('should not be able to update a non-existing category', async () => {
    await expect(sut.execute('non-existing-id')).rejects.toEqual(
      new AppError('Category not found', 404),
    );
  });
});
