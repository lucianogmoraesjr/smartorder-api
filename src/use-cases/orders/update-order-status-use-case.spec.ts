import { makeOrder } from 'test/factories/make-order';
import { makeProduct } from 'test/factories/make-product';

import { UpdateOrderStatusUseCase } from './update-order-status-use-case';

import { InMemoryOrdersRepository } from '@/repositories/in-memory/in-memory-orders-repository';

let inMemoryOrdersRepository: InMemoryOrdersRepository;
let sut: UpdateOrderStatusUseCase;

describe('Update Order Status Use Case', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    sut = new UpdateOrderStatusUseCase(inMemoryOrdersRepository);
  });

  it('should be able to update order status to IN_PRODUCTION', async () => {
    const product1 = makeProduct();
    const product2 = makeProduct();

    const order = await inMemoryOrdersRepository.create(
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

    await sut.execute({
      id: order.id,
      status: 'IN_PRODUCTION',
    });

    expect(inMemoryOrdersRepository.orders[0].status).toBe('IN_PRODUCTION');
  });

  it('should be able to update order status to DONE', async () => {
    const product1 = makeProduct();
    const product2 = makeProduct();

    const order = await inMemoryOrdersRepository.create(
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

    await sut.execute({
      id: order.id,
      status: 'DONE',
    });

    expect(inMemoryOrdersRepository.orders[0].status).toBe('DONE');
  });
});
