import { IUsersRepository } from '../../repositories/users-repository';

import { AppError } from '@/errors/app-error';

export class DeleteUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: string) {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists) {
      throw new AppError('User not found', 404);
    }

    await this.usersRepository.delete(id);
  }
}
