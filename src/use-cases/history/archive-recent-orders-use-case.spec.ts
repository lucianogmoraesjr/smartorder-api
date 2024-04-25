import { makeOrder } from 'test/factories/make-order';

import { ArchiveRecentOrdersUseCase } from './archive-recent-orders-use-case';

import { AppError } from '@/errors/app-error';
import { InMemoryHistoryRepository } from '@/repositories/in-memory/in-memory-history-repository';
import { InMemoryOrdersRepository } from '@/repositories/in-memory/in-memory-orders-repository';

let inMemoryOrdersRepository: InMemoryOrdersRepository;
let inMemoryHistoryRepository: InMemoryHistoryRepository;
let sut: ArchiveRecentOrdersUseCase;

describe('Archive Order Use Case', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    inMemoryHistoryRepository = new InMemoryHistoryRepository();
    sut = new ArchiveRecentOrdersUseCase(
      inMemoryOrdersRepository,
      inMemoryHistoryRepository,
    );

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to archive all recent orders', async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 20, 0));

    const order1 = await inMemoryOrdersRepository.create(makeOrder());
    const order2 = await inMemoryOrdersRepository.create(makeOrder());
    const order3 = await inMemoryOrdersRepository.create(makeOrder());

    await sut.execute([order1.id, order2.id, order3.id]);

    expect(inMemoryOrdersRepository.orders[0]).toEqual(
      expect.objectContaining({
        archivedAt: new Date(2024, 0, 1, 20, 0),
      }),
    );
    expect(inMemoryOrdersRepository.orders[1]).toEqual(
      expect.objectContaining({
        archivedAt: new Date(2024, 0, 1, 20, 0),
      }),
    );
    expect(inMemoryOrdersRepository.orders[2]).toEqual(
      expect.objectContaining({
        archivedAt: new Date(2024, 0, 1, 20, 0),
      }),
    );
    expect(inMemoryHistoryRepository.history).toHaveLength(3);
    expect(inMemoryHistoryRepository.history).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        orderId: order1.id,
      }),
      expect.objectContaining({
        id: expect.any(String),
        orderId: order2.id,
      }),
      expect.objectContaining({
        id: expect.any(String),
        orderId: order3.id,
      }),
    ]);
  });

  it('should not be able to archive if a non-existing order is in the list', async () => {
    const order1 = await inMemoryOrdersRepository.create(makeOrder());
    const order2 = await inMemoryOrdersRepository.create(makeOrder());

    await expect(
      sut.execute([order1.id, order2.id, 'non-existing-order']),
    ).rejects.toEqual(new AppError('One or more orders was not found', 404));
  });
});
