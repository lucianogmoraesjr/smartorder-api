import { makeCategory } from 'test/factories/make-category';
import { makeProduct } from 'test/factories/make-product';

import { CreateProductUseCase } from './create-product-use-case';

import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository';
import { InMemoryIngredientsRepository } from '@/repositories/in-memory/in-memory-ingredients-repository';
import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository';

let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let inMemoryIngredientsRepository: InMemoryIngredientsRepository;
let inMemoryProductsRepository: InMemoryProductsRepository;
let sut: CreateProductUseCase;

describe('Create Product Use Case', () => {
  beforeEach(async () => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    inMemoryIngredientsRepository = new InMemoryIngredientsRepository();
    inMemoryProductsRepository = new InMemoryProductsRepository();
    sut = new CreateProductUseCase(inMemoryProductsRepository);
  });

  it('should be able to create a product', async () => {
    const category = await inMemoryCategoriesRepository.create({
      name: 'Pizzas',
      emoji: '🍕',
    });

    const ingredient1 = await inMemoryIngredientsRepository.create({
      name: 'Parmesão',
      emoji: '🧀',
    });

    const ingredient2 = await inMemoryIngredientsRepository.create({
      name: 'Gorgonzola',
      emoji: '🧀',
    });

    const ingredient3 = await inMemoryIngredientsRepository.create({
      name: 'Brie',
      emoji: '🧀',
    });

    const product = await sut.execute({
      name: 'Test Product',
      description: 'Some test description',
      priceInCents: 10000,
      imagePath: 'some-path-to-image.png',
      categoryId: category.id,
      ingredients: [
        {
          ingredientId: ingredient1.id,
        },
        {
          ingredientId: ingredient2.id,
        },
        {
          ingredientId: ingredient3.id,
        },
      ],
    });

    expect(inMemoryProductsRepository.products).toHaveLength(1);
    expect(inMemoryProductsRepository.products[0]).toEqual(product);
    expect(inMemoryProductsRepository.products[0].ingredients).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ingredientId: ingredient1.id,
        }),
      ]),
    );
  });

  it('should be able to create a product without ingredients', async () => {
    const category = makeCategory();

    const product = await sut.execute(makeProduct({ categoryId: category.id }));

    expect(inMemoryProductsRepository.products).toHaveLength(1);
    expect(inMemoryProductsRepository.products[0]).toEqual(product);
  });
});
