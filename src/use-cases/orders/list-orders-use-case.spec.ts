import { makeOrder } from 'test/factories/make-order';
import { makeProduct } from 'test/factories/make-product';

import { ListOrdersUseCase } from './list-orders-use-case';

import { InMemoryOrdersRepository } from '@/repositories/in-memory/in-memory-orders-repository';

let inMemoryOrdersRepository: InMemoryOrdersRepository;
let sut: ListOrdersUseCase;

describe('List Orders Use Case', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    sut = new ListOrdersUseCase(inMemoryOrdersRepository);
  });

  it('should be able to list orders', async () => {
    const product1 = makeProduct();
    const product2 = makeProduct();

    inMemoryOrdersRepository.create(
      makeOrder({
        products: [
          {
            productId: product1.id,
            quantity: 1,
          },
          {
            productId: product2.id,
            quantity: 2,
          },
        ],
      }),
    );

    inMemoryOrdersRepository.create(
      makeOrder({
        products: [
          {
            productId: product1.id,
            quantity: 1,
          },
          {
            productId: product2.id,
            quantity: 2,
          },
        ],
      }),
    );

    const orders = await sut.execute();

    expect(orders).toHaveLength(2);
  });
});
