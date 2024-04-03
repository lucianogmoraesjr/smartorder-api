import { makeCategory } from 'test/factories/make-category';
import { makeProduct } from 'test/factories/make-product';
import { makeProductWithIngredients } from 'test/factories/make-product-with-ingredients';

import { CreateProductUseCase } from './create-product-use-case';

import { InMemoryCategoriesRepository } from '@/repositories/in-memory/in-memory-categories-repository';
import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository';

let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
let inMemoryProductsRepository: InMemoryProductsRepository;
let sut: CreateProductUseCase;

describe('Create Product Use Case', () => {
  beforeEach(async () => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    inMemoryProductsRepository = new InMemoryProductsRepository();
    sut = new CreateProductUseCase(inMemoryProductsRepository);
  });

  it('should be able to create a product', async () => {
    const category = await inMemoryCategoriesRepository.create(makeCategory());

    const product = await sut.execute(
      makeProductWithIngredients({ categoryId: category.id }),
    );

    expect(inMemoryProductsRepository.products).toHaveLength(1);
    expect(inMemoryProductsRepository.products[0]).toEqual(product);
    expect(inMemoryProductsRepository.products[0].ingredients).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ingredientId: expect.any(String),
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
