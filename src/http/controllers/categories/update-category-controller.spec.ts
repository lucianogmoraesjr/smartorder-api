import request from 'supertest';
import { makePrismaCategory } from 'test/factories/make-category';

import { app } from '@/app';

describe('Update Category (E2E)', () => {
  test('[PUT] /categories/:categoryId', async () => {
    const category = await makePrismaCategory({ name: 'Burgers' });

    const response = await request(app).put(`/categories/${category.id}`).send({
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
