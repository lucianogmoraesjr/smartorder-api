import { ListCategoriesUseCase } from './list-categories-use-case';

import { ICategoriesRepository } from '@/app/repositories/categories-repository';
import { InMemoryCategoriesRepository } from '@/app/repositories/in-memory/in-memory-categories-repository';

let inMemoryCategoriesRepository: ICategoriesRepository;
let sut: ListCategoriesUseCase;

describe('List Categories Use Case', () => {
  beforeEach(async () => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    sut = new ListCategoriesUseCase(inMemoryCategoriesRepository);
  });

  it('should be able to list all categories', async () => {
    await inMemoryCategoriesRepository.create({
      name: 'Pizzas',
      emoji: '🍕',
    });

    await inMemoryCategoriesRepository.create({
      name: 'Burgers',
      emoji: '🍔',
    });

    await inMemoryCategoriesRepository.create({
      name: 'Bebidas',
      emoji: '🍻',
    });

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
