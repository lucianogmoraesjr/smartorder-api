import { AppError } from '@/errors/app-error';
import { IUsersRepository } from '@/repositories/users-repository';

export class GetUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: string) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }
}
