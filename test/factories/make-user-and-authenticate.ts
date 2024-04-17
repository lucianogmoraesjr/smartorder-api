import { hash } from 'bcrypt';
import { Express } from 'express';
import request from 'supertest';

import { prisma } from '@/lib/prisma';

export async function makeUserAndAuthenticate(app: Express, isAdmin = true) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@mail.com',
      passwordHash: await hash('123456', 6),
      role: isAdmin ? 'ADMIN' : 'WAITER',
    },
  });

  const response = await request(app).post('/authenticate').send({
    email: 'john@mail.com',
    password: '123456',
  });

  const { accessToken } = response.body;

  return { accessToken };
}
