import { makeProductWithIngredients } from 'test/factories/make-product-with-ingredients';

import { ListProductsUseCase } from './list-products-use-case';

import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository';

let inMemoryProductsRepository: InMemoryProductsRepository;
let sut: ListProductsUseCase;

describe('List Products Use Case', () => {
  beforeEach(async () => {
    inMemoryProductsRepository = new InMemoryProductsRepository();
    sut = new ListProductsUseCase(inMemoryProductsRepository);
  });

  it('should be able to list all products', async () => {
    await inMemoryProductsRepository.create(makeProductWithIngredients());

    const products = await sut.execute();

    expect(products).toHaveLength(1);
  });
});
