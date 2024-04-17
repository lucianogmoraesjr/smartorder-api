import request from 'supertest';
import { makeUserAndAuthenticate } from 'test/factories/make-user-and-authenticate';

import { app } from '@/app';

describe('Create User (E2E)', () => {
  test('[POST] /users', async () => {
    const { accessToken } = await makeUserAndAuthenticate(app);

    const response = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'John Doe',
        email: 'johndoe@mail.com',
        password: '123456',
      });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: expect.any(String),
    });
  });
});
