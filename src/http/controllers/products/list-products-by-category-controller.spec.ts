import request from 'supertest';
import { makePrismaCategory } from 'test/factories/make-category';
import { makePrismaIngredient } from 'test/factories/make-ingredient';
import { makePrismaProductWithIngredients } from 'test/factories/make-product-with-ingredients';
import { makeUserAndAuthenticate } from 'test/factories/make-user-and-authenticate';

import { app } from '@/app';

describe('List Products By Category (E2E)', () => {
  test('[GET] /categories/:productId/products', async () => {
    const [category1, category2] = await Promise.all([
      makePrismaCategory({
        name: 'Burgers',
      }),
      makePrismaCategory({
        name: 'Pizzas',
      }),
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
        category: category1,
        name: 'product-1',
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
        category: category1,
        name: 'product-2',
        ingredients: [
          {
            ingredientId: ingredient2.id,
          },
          {
            ingredientId: ingredient3.id,
          },
        ],
      }),
      makePrismaProductWithIngredients({
        category: category2,
        name: 'product-3',
        ingredients: [
          {
            ingredientId: ingredient1.id,
          },
        ],
      }),
    ]);

    const { accessToken } = await makeUserAndAuthenticate(app);

    const response = await request(app)
      .get(`/categories/${category1.id}/products`)
      .set('Authorization', `Bearer ${accessToken}`);

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
