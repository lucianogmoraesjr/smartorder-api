import { makeUser } from 'test/factories/make-user';

import { GetUserProfileUseCase } from './get-user-profile-use-case';

import { AppError } from '@/errors/app-error';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(inMemoryUsersRepository);
  });

  it('should be able to get a profile of the current user', async () => {
    const user = await inMemoryUsersRepository.create(makeUser());

    const userProfile = await sut.execute(user.id);

    expect(userProfile).toEqual(
      expect.objectContaining({
        name: user.name,
      }),
    );
  });

  it('should not be able to get a profile of a non-existing user', async () => {
    await expect(sut.execute('non-existing-id')).rejects.toEqual(
      new AppError('User not found', 404),
    );
  });
});
