import { makeOrder } from 'test/factories/make-order';
import { makeProduct } from 'test/factories/make-product';

import { GetOrderByIdUseCase } from './get-order-by-id-use-case';

import { AppError } from '@/errors/app-error';
import { InMemoryOrdersRepository } from '@/repositories/in-memory/in-memory-orders-repository';

let inMemoryOrdersRepository: InMemoryOrdersRepository;
let sut: GetOrderByIdUseCase;

describe('Get Order By Id Use Case', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    sut = new GetOrderByIdUseCase(inMemoryOrdersRepository);
  });

  it('should be able to get a order by id', async () => {
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

    const orderById = await sut.execute(order.id);

    expect(orderById).toEqual(
      expect.objectContaining({
        id: order.id,
      }),
    );
  });

  it('should not be able to get a non-existing order', async () => {
    await expect(sut.execute('non-existing-order')).rejects.toEqual(
      new AppError('Order not found', 404),
    );
  });
});
