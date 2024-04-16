import request from 'supertest';

import { app } from '@/app';

describe('Create User (E2E)', () => {
  test('[POST] /users', async () => {
    const response = await request(app).post('/users').send({
      name: 'John Doe',
      email: 'john@mail.com',
      password: '123456',
    });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: expect.any(String),
    });
  });
});
