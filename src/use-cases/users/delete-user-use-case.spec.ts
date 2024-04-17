import { makeUser } from 'test/factories/make-user';

import { DeleteUserUseCase } from './delete-user-use-case';

import { AppError } from '@/errors/app-error';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: DeleteUserUseCase;

describe('Delete User Use Case', () => {
  beforeEach(async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new DeleteUserUseCase(inMemoryUsersRepository);
  });

  it('should be able to delete a user', async () => {
    const user = await inMemoryUsersRepository.create(makeUser());

    await sut.execute(user.id);

    expect(inMemoryUsersRepository.users).toHaveLength(0);
  });

  it('should not be able to delete a non-existing user', async () => {
    await expect(sut.execute('non-existing-id')).rejects.toEqual(
      new AppError('User not found', 404),
    );
  });
});
