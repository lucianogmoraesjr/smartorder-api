import request from 'supertest';
import { makePrismaCategory } from 'test/factories/make-category';
import { makeUserAndAuthenticate } from 'test/factories/make-user-and-authenticate';

import { app } from '@/app';

describe('Update Category (E2E)', () => {
  test('[PUT] /categories/:categoryId', async () => {
    const category = await makePrismaCategory({ name: 'Burgers' });

    const { accessToken } = await makeUserAndAuthenticate(app);

    const response = await request(app)
      .put(`/categories/${category.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Pizzas',
        emoji: '🧪',
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Pizzas',
      }),
    );
  });
});
