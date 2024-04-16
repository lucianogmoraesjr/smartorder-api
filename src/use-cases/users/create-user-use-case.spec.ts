import { compare } from 'bcrypt';
import { makeUser } from 'test/factories/make-user';

import { CreateUserUseCase } from './create-user-use-case';

import { AppError } from '@/errors/app-error';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe('Create User Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it('should be able to create a user', async () => {
    const user = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'john@mail.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash use password upon registration', async () => {
    const user = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'john@mail.com',
      password: '123456',
    });

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.passwordHash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to create a user if e-mail already exists', async () => {
    await inMemoryUsersRepository.create(
      makeUser({
        email: 'john@mail.com',
      }),
    );

    await expect(
      createUserUseCase.execute({
        name: 'John Doe',
        email: 'john@mail.com',
        password: '123456',
      }),
    ).rejects.toEqual(new AppError('E-mail already exists.'));
  });
});
