import { GetUserProfileUseCase } from '../get-user-profile-use-case';

import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';

export function makeGetUserProfileUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const getUserProfileUseCase = new GetUserProfileUseCase(
    prismaUsersRepository,
  );

  return getUserProfileUseCase;
}
