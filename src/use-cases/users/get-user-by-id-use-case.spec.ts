import { makeUser } from 'test/factories/make-user';

import { GetUserByIdUseCase } from './get-user-by-id-use-case';

import { AppError } from '@/errors/app-error';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { IUsersRepository } from '@/repositories/users-repository';

let inMemoryUsersRepository: IUsersRepository;
let sut: GetUserByIdUseCase;

describe('Get User By Id Use Case', () => {
  beforeEach(async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new GetUserByIdUseCase(inMemoryUsersRepository);
  });

  it('should be able to get a user by id', async () => {
    const mockedUser = await inMemoryUsersRepository.create(
      makeUser({
        name: 'John Doe',
      }),
    );

    const user = await sut.execute(mockedUser.id);

    expect(user).toEqual(mockedUser);
  });

  it('should not be able to get a non-existing user', async () => {
    await expect(sut.execute('non-existing-id')).rejects.toEqual(
      new AppError('User not found', 404),
    );
  });
});
