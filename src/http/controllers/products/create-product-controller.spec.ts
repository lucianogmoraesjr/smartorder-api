import request from 'supertest';
import { makePrismaCategory } from 'test/factories/make-category';
import { makePrismaIngredient } from 'test/factories/make-ingredient';
import { makeProductWithIngredients } from 'test/factories/make-product-with-ingredients';
import { makeUserAndAuthenticate } from 'test/factories/make-user-and-authenticate';

import { app } from '@/app';

describe('Create Product (E2E)', () => {
  test('[POST] /products', async () => {
    const category = await makePrismaCategory({
      name: 'category-1',
    });

    const [ingredient1, ingredient2, ingredient3] = await Promise.all([
      makePrismaIngredient({
        name: 'ingredient-1',
      }),
      makePrismaIngredient({
        name: 'ingredient-2',
      }),
      makePrismaIngredient({
        name: 'ingredient-3',
      }),
    ]);

    const product = makeProductWithIngredients({
      categoryId: category.id,
      ingredients: [ingredient1.id, ingredient2.id, ingredient3.id],
    });

    const { accessToken } = await makeUserAndAuthenticate(app);

    const response = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(product);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: expect.any(String),
    });
  });
});
