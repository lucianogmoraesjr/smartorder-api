import { makeProduct } from 'test/factories/make-product';

import { UpdateProductUseCase } from './update-product-use-case';

import { AppError } from '@/errors/app-error';
import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository';
import { InMemoryIngredientsRepository } from '@/repositories/in-memory/in-memory-ingredients-repository';
import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository';

let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let inMemoryIngredientsRepository: InMemoryIngredientsRepository;
let inMemoryProductsRepository: InMemoryProductsRepository;
let sut: UpdateProductUseCase;

describe('Update Product Use Case', () => {
  beforeEach(async () => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    inMemoryIngredientsRepository = new InMemoryIngredientsRepository();
    inMemoryProductsRepository = new InMemoryProductsRepository();
    sut = new UpdateProductUseCase(inMemoryProductsRepository);
  });

  it('should be able to update a product', async () => {
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

    const updatedProduct = await sut.execute({
      ...product,
      categoryId: category.id,
      priceInCents: 4500,
    });

    expect(updatedProduct).toEqual(
      expect.objectContaining({
        priceInCents: 4500,
      }),
    );
  });

  it('should not be able to update a non-existing product', async () => {
    await expect(
      sut.execute({
        ...makeProduct(),
        categoryId: 'some-category-id',
        id: 'non-existing-product-id',
      }),
    ).rejects.toEqual(new AppError('Product not found', 404));
  });
});
