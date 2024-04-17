import request from 'supertest';
import { makePrismaUser } from 'test/factories/make-user';
import { makeUserAndAuthenticate } from 'test/factories/make-user-and-authenticate';

import { app } from '@/app';
import { prisma } from '@/lib/prisma';

describe('Delete User (E2E)', () => {
  test('[DELETE] /users/:userId', async () => {
    const user = await makePrismaUser();

    const { accessToken } = await makeUserAndAuthenticate(app);

    const response = await request(app)
      .delete(`/users/${user.id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(204);

    const userOnDatabase = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    expect(userOnDatabase).toBeFalsy();
  });
});
