import request from 'supertest';
import { makeUserAndAuthenticate } from 'test/factories/make-user-and-authenticate';

import { app } from '@/app';

describe('Get User Profile (E2E)', () => {
  test('[GET] /users/me', async () => {
    const { accessToken } = await makeUserAndAuthenticate(app);

    const response = await request(app)
      .get('/users/me')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    );
  });
});
