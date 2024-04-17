import { hash } from 'bcrypt';

import { IUsersRepository } from '../../repositories/users-repository';

import { AppError } from '@/errors/app-error';

interface ICreateUserUseCaseRequest {
  id: string;
  name: string;
  email: string;
  password: string;
  role?: 'WAITER' | 'ADMIN';
}

export class UpdateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    id,
    name,
    email,
    password,
    role,
  }: ICreateUserUseCaseRequest) {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists) {
      throw new AppError('User not found', 404);
    }

    const passwordHash = await hash(password, 6);

    const user = await this.usersRepository.update({
      id,
      name,
      email,
      passwordHash,
      role,
    });

    return user;
  }
}
