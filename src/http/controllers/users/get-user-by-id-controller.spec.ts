import request from 'supertest';
import { makePrismaUser } from 'test/factories/make-user';
import { makeUserAndAuthenticate } from 'test/factories/make-user-and-authenticate';

import { app } from '@/app';

describe('Get User By Id (E2E)', () => {
  test('[GET] /users/:userId', async () => {
    const user = await makePrismaUser();

    const { accessToken } = await makeUserAndAuthenticate(app);

    const response = await request(app)
      .get(`/users/${user.id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: user.name,
      }),
    );
  });
});
