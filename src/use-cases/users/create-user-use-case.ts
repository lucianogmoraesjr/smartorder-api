import { hash } from 'bcrypt';

import { AppError } from '@/errors/app-error';
import { IUsersRepository } from '@/repositories/users-repository';

interface ICreateUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
  role?: 'WAITER' | 'ADMIN';
}

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ name, email, password, role }: ICreateUserUseCaseRequest) {
    const emailAlreadyExists = await this.usersRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new AppError('E-mail already exists.', 400);
    }

    const passwordHash = await hash(password, 6);

    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash,
      role,
    });

    return user;
  }
}
