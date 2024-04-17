import { IUsersRepository } from '@/repositories/users-repository';

export class ListUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute() {
    const users = await this.usersRepository.findAll();

    return users;
  }
}
