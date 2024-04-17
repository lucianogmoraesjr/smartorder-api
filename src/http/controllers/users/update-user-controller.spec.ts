import request from 'supertest';
import { makePrismaUser } from 'test/factories/make-user';
import { makeUserAndAuthenticate } from 'test/factories/make-user-and-authenticate';

import { app } from '@/app';

describe('Update User (E2E)', () => {
  test('[PUT] /users/:userId', async () => {
    const user = await makePrismaUser();

    const { accessToken } = await makeUserAndAuthenticate(app);

    const response = await request(app)
      .put(`/users/${user.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        ...user,
        password: user.passwordHash,
        name: 'New Name',
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'New Name',
      }),
    );
  });
});
