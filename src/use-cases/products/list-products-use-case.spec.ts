import { makeProductWithIngredients } from 'test/factories/make-product-with-ingredients';

import { ListProductsUseCase } from './list-products-use-case';

import { InMemoryProductsIngredientsRepository } from '@/repositories/in-memory/in-memory-products-ingredients-repository';
import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository';

let inMemoryProductsIngredientsRepository: InMemoryProductsIngredientsRepository;
let inMemoryProductsRepository: InMemoryProductsRepository;
let sut: ListProductsUseCase;

describe('List Products Use Case', () => {
  beforeEach(async () => {
    inMemoryProductsIngredientsRepository =
      new InMemoryProductsIngredientsRepository();
    inMemoryProductsRepository = new InMemoryProductsRepository(
      inMemoryProductsIngredientsRepository,
    );
    sut = new ListProductsUseCase(inMemoryProductsRepository);
  });

  it('should be able to list all products', async () => {
    const product = await inMemoryProductsRepository.create(
      makeProductWithIngredients(),
    );

    const products = await sut.execute();

    expect(products).toHaveLength(1);
    expect(
      inMemoryProductsIngredientsRepository.productsIngredients[0],
    ).toEqual(
      expect.objectContaining({
        productId: product.id,
      }),
    );
  });
});
