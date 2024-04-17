import request from 'supertest';
import { makePrismaCategory } from 'test/factories/make-category';
import { makePrismaIngredient } from 'test/factories/make-ingredient';
import { makePrismaProductWithIngredients } from 'test/factories/make-product-with-ingredients';
import { makeUserAndAuthenticate } from 'test/factories/make-user-and-authenticate';

import { app } from '@/app';

describe('List Products (E2E)', () => {
  test('[GET] /products', async () => {
    const [category1, category2] = await Promise.all([
      makePrismaCategory({ name: 'category-1' }),
      makePrismaCategory({ name: 'category-2' }),
    ]);

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

    await Promise.all([
      makePrismaProductWithIngredients({
        name: 'product-1',
        category: category1,
        ingredients: [
          {
            ingredientId: ingredient1.id,
          },
          {
            ingredientId: ingredient2.id,
          },
        ],
      }),
      makePrismaProductWithIngredients({
        name: 'product-2',
        category: category2,
        ingredients: [
          {
            ingredientId: ingredient3.id,
          },
        ],
      }),
    ]);

    const { accessToken } = await makeUserAndAuthenticate(app);

    const response = await request(app)
      .get('/products')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });
});
