import { makeUser } from 'test/factories/make-user';

import { UpdateUserUseCase } from './update-user-use-case';

import { AppError } from '@/errors/app-error';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: UpdateUserUseCase;

describe('Update User Use Case', () => {
  beforeEach(async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new UpdateUserUseCase(inMemoryUsersRepository);
  });

  it('should be able to update a user', async () => {
    const user = await inMemoryUsersRepository.create(makeUser());

    await sut.execute({
      ...user,
      password: user.passwordHash,
      name: 'New Name',
    });

    expect(inMemoryUsersRepository.users).toEqual([
      expect.objectContaining({
        name: 'New Name',
      }),
    ]);
  });

  it('should not be able to update a non-existing user', async () => {
    await expect(
      sut.execute({
        id: 'non-existing-id',
        name: 'John',
        email: 'john@mail.com',
        password: 'super-secret',
      }),
    ).rejects.toEqual(new AppError('User not found', 404));
  });
});
