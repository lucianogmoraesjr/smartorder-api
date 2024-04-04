import request from 'supertest';
import { makePrismaCategory } from 'test/factories/make-category';
import { makePrismaOrder } from 'test/factories/make-order';
import { makePrismaProduct } from 'test/factories/make-product';

import { app } from '@/app';

describe('List Orders (E2E)', () => {
  test('[GET] /orders', async () => {
    const category1 = await makePrismaCategory({
      name: 'category-1',
    });
    const category2 = await makePrismaCategory({
      name: 'category-2',
    });

    const [product1, product2] = await Promise.all([
      makePrismaProduct({ categoryId: category1.id }),
      makePrismaProduct({ categoryId: category2.id }),
    ]);

    await Promise.all([
      makePrismaOrder({
        products: [
          {
            productId: product1.id,
            quantity: 1,
          },
          {
            productId: product2.id,
            quantity: 2,
          },
        ],
      }),
      makePrismaOrder({
        products: [
          {
            productId: product1.id,
            quantity: 2,
          },
          {
            productId: product2.id,
            quantity: 4,
          },
        ],
      }),
    ]);

    const response = await request(app).get('/orders');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });
});
