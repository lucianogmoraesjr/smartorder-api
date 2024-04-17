import request from 'supertest';
import { makeUserAndAuthenticate } from 'test/factories/make-user-and-authenticate';

import { app } from '@/app';

describe('Create Ingredient (E2E)', () => {
  test('[POST] /ingredients', async () => {
    const { accessToken } = await makeUserAndAuthenticate(app);

    const response = await request(app)
      .post('/ingredients')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Test',
        emoji: '🧪',
      });

    expect(response.status).toBe(201);
  });
});
