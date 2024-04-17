import { IUsersRepository } from '../../repositories/users-repository';

import { AppError } from '@/errors/app-error';

export class GetUserByIdUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: string) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }
}
