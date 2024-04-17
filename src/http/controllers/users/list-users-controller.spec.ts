import request from 'supertest';
import { makePrismaUser } from 'test/factories/make-user';
import { makeUserAndAuthenticate } from 'test/factories/make-user-and-authenticate';

import { app } from '@/app';

describe('List Users (E2E)', () => {
  test('[GET] /users', async () => {
    await Promise.all([makePrismaUser(), makePrismaUser()]);

    const { accessToken } = await makeUserAndAuthenticate(app);

    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
  });
});
