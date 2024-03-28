import { makeCategory } from 'test/factories/make-category';

import { ListCategoriesUseCase } from './list-categories-use-case';

import { ICategoriesRepository } from '@/repositories/categories-repository';
import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository';

let inMemoryCategoriesRepository: ICategoriesRepository;
let sut: ListCategoriesUseCase;

describe('List Categories Use Case', () => {
  beforeEach(async () => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    sut = new ListCategoriesUseCase(inMemoryCategoriesRepository);
  });

  it('should be able to list all categories', async () => {
    await inMemoryCategoriesRepository.create(
      makeCategory({
        name: 'Pizzas',
        emoji: '🍕',
      }),
    );

    await inMemoryCategoriesRepository.create(makeCategory());

    await inMemoryCategoriesRepository.create(makeCategory());

    const categories = await sut.execute();

    expect(categories).toHaveLength(3);
    expect(categories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Pizzas',
          emoji: '🍕',
        }),
      ]),
    );
  });
});
