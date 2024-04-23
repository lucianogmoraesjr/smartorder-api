import { makeOrder } from 'test/factories/make-order';

import { ArchiveOrderUseCase } from './archive-order-use-case';
import { ListArchivedOrdersUseCase } from './list-archived-orders-use-case';

import { InMemoryHistoryRepository } from '@/repositories/in-memory/in-memory-history-repository';
import { InMemoryOrdersRepository } from '@/repositories/in-memory/in-memory-orders-repository';

let inMemoryHistoryRepository: InMemoryHistoryRepository;
let inMemoryOrdersRepository: InMemoryOrdersRepository;
let archiveOrderUseCase: ArchiveOrderUseCase;
let sut: ListArchivedOrdersUseCase;

describe('List Archived Orders Use Case', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    inMemoryHistoryRepository = new InMemoryHistoryRepository();
    archiveOrderUseCase = new ArchiveOrderUseCase(
      inMemoryOrdersRepository,
      inMemoryHistoryRepository,
    );
    sut = new ListArchivedOrdersUseCase(inMemoryHistoryRepository);
  });

  it('should be able to list all archived orders', async () => {
    const [order1, order2] = await Promise.all([
      inMemoryOrdersRepository.create(makeOrder()),
      inMemoryOrdersRepository.create(makeOrder()),
      inMemoryOrdersRepository.create(makeOrder()),
    ]);

    await archiveOrderUseCase.execute(order1.id);
    await archiveOrderUseCase.execute(order2.id);

    const archivedOrders = await sut.execute();

    expect(archivedOrders).toHaveLength(2);
    expect(inMemoryOrdersRepository.orders).toHaveLength(3);
  });
});
