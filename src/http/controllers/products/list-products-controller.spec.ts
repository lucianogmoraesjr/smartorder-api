import request from 'supertest';
import { makePrismaCategory } from 'test/factories/make-category';
import { makePrismaProductWithIngredients } from 'test/factories/make-product-with-ingredients';

import { app } from '@/app';

describe('List Products (E2E)', () => {
  test('[GET] /products', async () => {
    const [category1, category2] = await Promise.all([
      makePrismaCategory({ name: 'category-1' }),
      makePrismaCategory({ name: 'category-2' }),
    ]);

    await Promise.all([
      makePrismaProductWithIngredients({
        name: 'product-1',
        category: category1,
      }),
      makePrismaProductWithIngredients({
        name: 'product-2',
        category: category2,
      }),
    ]);

    const response = await request(app).get('/products');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });
});
