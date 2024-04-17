import request from 'supertest';
import { makeUserAndAuthenticate } from 'test/factories/make-user-and-authenticate';

import { app } from '@/app';

describe('Create Category (E2E)', () => {
  test('[POST] /categories', async () => {
    const { accessToken } = await makeUserAndAuthenticate(app);

    const response = await request(app)
      .post('/categories')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Test',
        emoji: '🧪',
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Test',
        emoji: '🧪',
      }),
    );
  });
});
