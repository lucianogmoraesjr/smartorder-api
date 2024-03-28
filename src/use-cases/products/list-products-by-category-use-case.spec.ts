import { ListProductsByCategoryUseCase } from './list-products-by-category-use-case';

import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository';
import { InMemoryIngredientsRepository } from '@/repositories/in-memory/in-memory-ingredients-repository';
import { InMemoryProductsIngredientsRepository } from '@/repositories/in-memory/in-memory-products-ingredients-repository';
import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository';

let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let inMemoryIngredientsRepository: InMemoryIngredientsRepository;
let inMemoryProductsIngredientsRepository: InMemoryProductsIngredientsRepository;
let inMemoryProductsRepository: InMemoryProductsRepository;
let sut: ListProductsByCategoryUseCase;

describe('List Products By Category Use Case', () => {
  beforeEach(async () => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    inMemoryIngredientsRepository = new InMemoryIngredientsRepository();
    inMemoryProductsIngredientsRepository =
      new InMemoryProductsIngredientsRepository();
    inMemoryProductsRepository = new InMemoryProductsRepository(
      inMemoryProductsIngredientsRepository,
    );
    sut = new ListProductsByCategoryUseCase(inMemoryProductsRepository);
  });

  it('should be able to list all products of a category', async () => {
    const category1 = await inMemoryCategoriesRepository.create({
      name: 'Pizzas',
      emoji: '🍕',
    });

    const category2 = await inMemoryCategoriesRepository.create({
      name: 'Burgers',
      emoji: '🍔',
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

    const product1 = await inMemoryProductsRepository.create({
      name: 'Pizza 3 queijos',
      description: 'Deliciosa pizza sabor 3 queijos',
      priceInCents: 3500,
      imagePath: '1710780936676-quatro-queijos.png',
      categoryId: category1.id,
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

    const product2 = await inMemoryProductsRepository.create({
      name: 'Pizza 2 queijos',
      description: 'Deliciosa pizza sabor 2 queijos',
      priceInCents: 3500,
      imagePath: '1710780936676-quatro-queijos.png',
      categoryId: category1.id,
      ingredients: [
        {
          ingredientId: ingredient1.id,
        },
        {
          ingredientId: ingredient2.id,
        },
      ],
    });

    await inMemoryProductsRepository.create({
      name: 'Burger Queijo',
      description: 'Burger sabor um queijo',
      priceInCents: 3500,
      imagePath: '1710780936676-quatro-queijos.png',
      categoryId: category2.id,
      ingredients: [
        {
          ingredientId: ingredient1.id,
        },
      ],
    });

    const products = await sut.execute(category1.id);

    expect(products).toHaveLength(2);
    expect(products).toEqual(expect.arrayContaining([product1, product2]));
  });
});
