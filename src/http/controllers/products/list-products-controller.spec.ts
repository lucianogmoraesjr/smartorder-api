import request from 'supertest';
import { makePrismaProductWithIngredients } from 'test/factories/make-product-with-ingredients';

import { app } from '@/app';

describe('List Products (E2E)', () => {
  test('[GET] /products', async () => {
    await Promise.all([
      makePrismaProductWithIngredients(),
      makePrismaProductWithIngredients(),
    ]);

    const response = await request(app).get('/products');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });
});
