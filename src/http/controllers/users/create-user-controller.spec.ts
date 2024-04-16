import request from 'supertest';
import { makeUser } from 'test/factories/make-user';

import { app } from '@/app';

describe('Create User (E2E)', () => {
  test('[POST] /users', async () => {
    const response = await request(app).post('/users').send(makeUser());

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: expect.any(String),
    });
  });
});
