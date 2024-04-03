import { makeOrder } from 'test/factories/make-order';

import { CancelOrderUseCase } from './cancel-order-use-case';

import { InMemoryOrdersRepository } from '@/repositories/in-memory/in-memory-orders-repository';

let inMemoryOrdersRepository: InMemoryOrdersRepository;
let sut: CancelOrderUseCase;

describe('Cancel Order Use Case', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    sut = new CancelOrderUseCase(inMemoryOrdersRepository);
  });

  it('should be able to cancel order', async () => {
    const order = await inMemoryOrdersRepository.create(makeOrder());

    await sut.execute(order.id);

    expect(inMemoryOrdersRepository.orders).toHaveLength(0);
  });
});
