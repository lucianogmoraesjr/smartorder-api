import { hash } from 'bcrypt';
import { makeUser } from 'test/factories/make-user';

import { AuthenticateUseCase } from './authenticate-use-case';

import { AppError } from '@/errors/app-error';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

let inMemoryUsersRepository: InMemoryUsersRepository;
let authenticateUseCase: AuthenticateUseCase;

describe('Authenticate User Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    authenticateUseCase = new AuthenticateUseCase(inMemoryUsersRepository);
  });

  it('should be able to authenticate a user', async () => {
    await inMemoryUsersRepository.create(
      makeUser({
        email: 'john@mail.com',
        passwordHash: await hash('123456', 6),
      }),
    );

    const { accessToken } = await authenticateUseCase.execute({
      email: 'john@mail.com',
      password: '123456',
    });

    expect(accessToken).toEqual(expect.any(String));
  });

  it('should not be able to authenticate a user with invalid e-mail', async () => {
    await expect(
      authenticateUseCase.execute({
        email: 'john@mail.com',
        password: '123456',
      }),
    ).rejects.toEqual(new AppError('Invalid e-mail or password', 401));
  });

  it('should not be able to authenticate a user with invalid password', async () => {
    await inMemoryUsersRepository.create(
      makeUser({
        email: 'john@mail.com',
        passwordHash: await hash('123456', 6),
      }),
    );

    await expect(
      authenticateUseCase.execute({
        email: 'john@mail.com',
        password: 'invalid-password',
      }),
    ).rejects.toEqual(new AppError('Invalid e-mail or password', 401));
  });
});
