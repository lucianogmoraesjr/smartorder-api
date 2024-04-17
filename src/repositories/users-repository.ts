import { Prisma, User } from '@prisma/client';

export interface IUsersRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
  update(data: Prisma.UserCreateInput): Promise<User>;
  delete(id: string): Promise<void>;
}
