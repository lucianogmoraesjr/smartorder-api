import { makeUser } from 'test/factories/make-user';

import { ListUsersUseCase } from './list-users-use-case';

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

let inMemoryUsersRepository: InMemoryUsersRepository;
let listUsersUseCase: ListUsersUseCase;

describe('List Users Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    listUsersUseCase = new ListUsersUseCase(inMemoryUsersRepository);
  });

  it('should be able to list users', async () => {
    await Promise.all([
      inMemoryUsersRepository.create(makeUser()),
      inMemoryUsersRepository.create(makeUser()),
    ]);

    const users = await listUsersUseCase.execute();

    expect(users).toHaveLength(2);
  });
});
