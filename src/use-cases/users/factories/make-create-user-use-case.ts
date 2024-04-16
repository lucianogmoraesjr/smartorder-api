import { CreateUserUseCase } from '../create-user-use-case';

import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';

export function makeCreateUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const createUserUseCase = new CreateUserUseCase(prismaUsersRepository);

  return createUserUseCase;
}
