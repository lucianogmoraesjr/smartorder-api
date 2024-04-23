import { makeOrder } from 'test/factories/make-order';

import { ArchiveOrderUseCase } from './archive-order-use-case';

import { AppError } from '@/errors/app-error';
import { InMemoryHistoryRepository } from '@/repositories/in-memory/in-memory-history-repository';
import { InMemoryOrdersRepository } from '@/repositories/in-memory/in-memory-orders-repository';

let inMemoryOrdersRepository: InMemoryOrdersRepository;
let inMemoryHistoryRepository: InMemoryHistoryRepository;
let sut: ArchiveOrderUseCase;

describe('Archive Order Use Case', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    inMemoryHistoryRepository = new InMemoryHistoryRepository();
    sut = new ArchiveOrderUseCase(
      inMemoryOrdersRepository,
      inMemoryHistoryRepository,
    );

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to archive an order', async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 20, 0));

    const order = await inMemoryOrdersRepository.create(makeOrder());

    await sut.execute(order.id);

    expect(inMemoryOrdersRepository.orders[0]).toEqual(
      expect.objectContaining({
        archivedAt: new Date(2024, 0, 1, 20, 0),
      }),
    );
    expect(inMemoryHistoryRepository.history).toHaveLength(1);
    expect(inMemoryHistoryRepository.history).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        orderId: order.id,
      }),
    ]);
  });

  it('should not be able to archive a non-existing order', async () => {
    await expect(sut.execute('non-existing-order')).rejects.toEqual(
      new AppError('Order not found', 404),
    );
  });
});
