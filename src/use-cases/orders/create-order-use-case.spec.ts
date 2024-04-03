import { makeProduct } from 'test/factories/make-product';

import { CreateOrderUseCase } from './create-order-use-case';

import { InMemoryOrdersRepository } from '@/repositories/in-memory/in-memory-orders-repository';

let inMemoryOrdersRepository: InMemoryOrdersRepository;
let sut: CreateOrderUseCase;

describe('Create Order Use Case', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    sut = new CreateOrderUseCase(inMemoryOrdersRepository);
  });

  it('should be able to create a order', async () => {
    const product1 = makeProduct();
    const product2 = makeProduct();

    const order = await sut.execute({
      table: 1,
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
    });

    expect(inMemoryOrdersRepository.orders).toHaveLength(1);
    expect(inMemoryOrdersRepository.orders).toEqual(
      expect.arrayContaining([order]),
    );
  });
});
