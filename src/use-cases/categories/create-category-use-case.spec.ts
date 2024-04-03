import { CreateCategoryUseCase } from './create-category-use-case';

import { AppError } from '@/errors/app-error';
import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository';

let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let sut: CreateCategoryUseCase;

describe('Create Category Use Case', () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    sut = new CreateCategoryUseCase(inMemoryCategoriesRepository);
  });

  it('should be able to create a category', async () => {
    const category = await sut.execute({
      name: 'category-test',
      emoji: '🧪',
    });

    expect(inMemoryCategoriesRepository.categories).toHaveLength(1);
    expect(inMemoryCategoriesRepository.categories).toEqual(
      expect.arrayContaining([category]),
    );
  });

  it('should not be able to create a category if name already exists', async () => {
    await inMemoryCategoriesRepository.create({
      name: 'already-exists',
      emoji: '🧪',
    });

    await expect(
      sut.execute({
        name: 'already-exists',
        emoji: '🧪',
      }),
    ).rejects.toEqual(new AppError('Category already exists.'));
  });
});
