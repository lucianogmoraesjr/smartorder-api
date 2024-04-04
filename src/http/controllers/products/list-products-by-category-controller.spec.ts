import request from 'supertest';
import { makePrismaCategory } from 'test/factories/make-category';
import { makePrismaProductWithIngredients } from 'test/factories/make-product-with-ingredients';

import { app } from '@/app';

describe('List Products By Category (E2E)', () => {
  test('[GET] /categories/:productId/products', async () => {
    const category1 = await makePrismaCategory({
      name: 'Burgers',
    });

    const category2 = await makePrismaCategory({
      name: 'Pizzas',
    });

    await Promise.all([
      makePrismaProductWithIngredients({
        category: category1,
        name: 'product-1',
      }),
      makePrismaProductWithIngredients({
        category: category1,
        name: 'product-2',
      }),
      makePrismaProductWithIngredients({
        category: category2,
        name: 'product-3',
      }),
    ]);

    const response = await request(app).get(
      `/categories/${category1.id}/products`,
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          category: {
            emoji: expect.any(String),
            name: 'Burgers',
          },
        }),
        expect.objectContaining({
          category: {
            emoji: expect.any(String),
            name: 'Burgers',
          },
        }),
      ]),
    );
  });
});
