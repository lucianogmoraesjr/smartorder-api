import request from 'supertest';
import { makePrismaCategory } from 'test/factories/make-category';
import { makePrismaProduct } from 'test/factories/make-product';

import { app } from '@/app';

describe('Create Order (E2E)', () => {
  test('[POST] /orders', async () => {
    const category = await makePrismaCategory({
      name: 'category-1',
    });

    const [product1, product2] = await Promise.all([
      makePrismaProduct({
        name: 'product-1',
        categoryId: category.id,
      }),
      makePrismaProduct({
        name: 'product-2',
        categoryId: category.id,
      }),
    ]);

    const response = await request(app)
      .post('/orders')
      .send({
        table: 1,
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
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        table: 1,
      }),
    );
    expect(response.body.products[0]).toEqual(
      expect.objectContaining({
        product: expect.objectContaining({
          id: expect.any(String),
        }),
      }),
    );
  });
});
