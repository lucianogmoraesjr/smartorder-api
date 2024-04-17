import { Prisma, User } from '@prisma/client';

import { IUsersRepository } from '../users-repository';

import { prisma } from '@/lib/prisma';

export class PrismaUsersRepository implements IUsersRepository {
  async findAll(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({ data });

    return user;
  }
}
