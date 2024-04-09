import request from 'supertest';
import { makePrismaCategory } from 'test/factories/make-category';

import { app } from '@/app';

describe('Get Category By Id (E2E)', () => {
  test('[GET] /categories/:categoryId', async () => {
    const category = await makePrismaCategory({ name: 'Burgers' });

    const response = await request(app).get(`/categories/${category.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Burgers',
      }),
    );
  });
});
