import { makeCategory } from 'test/factories/make-category';

import { GetCategoryByIdUseCase } from './get-category-by-id-use-case';

import { AppError } from '@/errors/app-error';
import { ICategoriesRepository } from '@/repositories/categories-repository';
import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository';

let inMemoryCategoriesRepository: ICategoriesRepository;
let sut: GetCategoryByIdUseCase;

describe('Get Category By Id Use Case', () => {
  beforeEach(async () => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    sut = new GetCategoryByIdUseCase(inMemoryCategoriesRepository);
  });

  it('should be able to get a category by id', async () => {
    const category = await inMemoryCategoriesRepository.create(
      makeCategory({
        name: 'Pizzas',
        emoji: '🍕',
      }),
    );

    const categories = await sut.execute(category.id);

    expect(categories).toEqual(category);
  });

  it('should not be able to get a non-existing category', async () => {
    await expect(sut.execute('non-existing-id')).rejects.toEqual(
      new AppError('Category not found', 404),
    );
  });
});
