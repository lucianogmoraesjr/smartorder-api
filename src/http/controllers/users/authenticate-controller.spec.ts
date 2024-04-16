import { hash } from 'bcrypt';
import request from 'supertest';
import { makePrismaUser } from 'test/factories/make-user';

import { app } from '@/app';

describe('Authenticate User (E2E)', () => {
  test('[POST] /authenticate', async () => {
    await makePrismaUser({
      email: 'john@mail.com',
      passwordHash: await hash('123456', 6),
    });

    const response = await request(app).post('/authenticate').send({
      email: 'john@mail.com',
      password: '123456',
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      token: expect.any(String),
    });
  });
});
