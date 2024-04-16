import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { AppError } from '@/errors/app-error';
import { IUsersRepository } from '@/repositories/users-repository';

interface IAuthenticateUseCaseRequest {
  email: string;
  password: string;
}

export class AuthenticateUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email, password }: IAuthenticateUseCaseRequest) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid e-mail or password', 401);
    }

    const doesPasswordsMatches = await compare(password, user.passwordHash);

    if (!doesPasswordsMatches) {
      throw new AppError('Invalid e-mail or password', 401);
    }

    const token = sign({ role: user.role }, 'my-super-secret-password', {
      subject: user.id,
    });

    return { token };
  }
}
