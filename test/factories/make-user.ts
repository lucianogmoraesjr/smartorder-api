import { randomUUID } from 'node:crypto';

import { faker } from '@faker-js/faker';
import { User } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export function makeUser(override: Partial<User> = {}, id?: string) {
  const user: User = {
    id: id ?? randomUUID(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    passwordHash: faker.internet.password(),
    role: faker.helpers.arrayElement(['ADMIN', 'WAITER']),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...override,
  };

  return user;
}

export async function makePrismaUser(data: Partial<User> = {}): Promise<User> {
  const user = makeUser(data);

  await prisma.user.create({
    data: user,
  });

  return user;
}
