import { ListUsersUseCase } from '../list-users-use-case';

import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';

export function makeListUsersUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const listUsersUseCase = new ListUsersUseCase(prismaUsersRepository);

  return listUsersUseCase;
}
