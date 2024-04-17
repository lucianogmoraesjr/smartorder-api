import { DeleteUserUseCase } from '../delete-user-use-case';

import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';

export function makeDeleteUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const deleteUserUseCase = new DeleteUserUseCase(prismaUsersRepository);

  return deleteUserUseCase;
}
