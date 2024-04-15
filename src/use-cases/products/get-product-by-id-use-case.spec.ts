import { GetProductByIdUseCase } from './get-product-by-id-use-case';

import { AppError } from '@/errors/app-error';
import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository';
import { InMemoryIngredientsRepository } from '@/repositories/in-memory/in-memory-ingredients-repository';
import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository';

let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let inMemoryIngredientsRepository: InMemoryIngredientsRepository;
let inMemoryProductsRepository: InMemoryProductsRepository;
let sut: GetProductByIdUseCase;

describe('Get Product By ID Use Case', () => {
  beforeEach(async () => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    inMemoryIngredientsRepository = new InMemoryIngredientsRepository();
    inMemoryProductsRepository = new InMemoryProductsRepository();
    sut = new GetProductByIdUseCase(inMemoryProductsRepository);
  });

  it('should be able to get a product by id', async () => {
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
      imagePath: 'tres-queijos.png',
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

    const productById = await sut.execute(product.id);

    expect(productById).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    );
  });

  it('should not be able to get a non-existing product', async () => {
    await expect(sut.execute('non-existing-product')).rejects.toEqual(
      new AppError('Product not found', 404),
    );
  });
});
