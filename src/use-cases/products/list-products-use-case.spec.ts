import { ListProductsUseCase } from './list-products-use-case';

import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository';
import { InMemoryIngredientsRepository } from '@/repositories/in-memory/in-memory-ingredients-repository';
import { InMemoryProductsIngredientsRepository } from '@/repositories/in-memory/in-memory-products-ingredients-repository';
import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository';

let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let inMemoryIngredientsRepository: InMemoryIngredientsRepository;
let inMemoryProductsIngredientsRepository: InMemoryProductsIngredientsRepository;
let inMemoryProductsRepository: InMemoryProductsRepository;
let sut: ListProductsUseCase;

describe('List Products Use Case', () => {
  beforeEach(async () => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    inMemoryIngredientsRepository = new InMemoryIngredientsRepository();
    inMemoryProductsIngredientsRepository =
      new InMemoryProductsIngredientsRepository();
    inMemoryProductsRepository = new InMemoryProductsRepository(
      inMemoryProductsIngredientsRepository,
    );
    sut = new ListProductsUseCase(inMemoryProductsRepository);
  });

  it('should be able to list all products', async () => {
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

    const product = await inMemoryProductsRepository.create({
      name: 'Pizza 3 queijos',
      description: 'Deliciosa pizza sabor 3 queijos',
      priceInCents: 3500,
      imagePath: '1710780936676-quatro-queijos.png',
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

    const products = await sut.execute();

    expect(products).toHaveLength(1);
    expect(products).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Pizza 3 queijos',
          description: 'Deliciosa pizza sabor 3 queijos',
        }),
      ]),
    );
    expect(
      inMemoryProductsIngredientsRepository.productsIngredients[0],
    ).toEqual({
      id: expect.any(String),
      ingredientId: ingredient1.id,
      productId: product.id,
    });
  });
});
