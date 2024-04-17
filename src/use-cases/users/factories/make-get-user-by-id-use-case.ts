import { GetUserByIdUseCase } from '../get-user-by-id-use-case';

import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';

export function makeGetUserByIdUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const getUserByIdUseCase = new GetUserByIdUseCase(prismaUsersRepository);

  return getUserByIdUseCase;
}
