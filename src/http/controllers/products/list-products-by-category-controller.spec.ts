import request from 'supertest';
import { makePrismaCategory } from 'test/factories/make-category';
import { makePrismaProductWithIngredients } from 'test/factories/make-product-with-ingredients';

import { app } from '@/app';

describe('List Products By Category (E2E)', () => {
  test('[GET] /categories/:productId/products', async () => {
    const category = await makePrismaCategory({
      name: 'Burgers',
    });

    await Promise.all([
      makePrismaProductWithIngredients(category),
      makePrismaProductWithIngredients(category),
      makePrismaProductWithIngredients(),
    ]);

    const response = await request(app).get(
      `/categories/${category.id}/products`,
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          category: {
            name: 'Burgers',
          },
        }),
        expect.objectContaining({
          category: {
            name: 'Burgers',
          },
        }),
      ]),
    );
  });
});
