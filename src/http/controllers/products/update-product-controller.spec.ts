import request from 'supertest';
import { makePrismaCategory } from 'test/factories/make-category';
import { makePrismaIngredient } from 'test/factories/make-ingredient';
import { makePrismaProductWithIngredients } from 'test/factories/make-product-with-ingredients';
import { makeUserAndAuthenticate } from 'test/factories/make-user-and-authenticate';

import { app } from '@/app';

describe('Update Product(E2E)', () => {
  test('[PUT] /products/:productId', async () => {
    const category = await makePrismaCategory({
      name: 'Burgers',
    });

    const [ingredient1, ingredient2] = await Promise.all([
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

    const product = await makePrismaProductWithIngredients({
      category: category,
      name: 'example-product',
      ingredients: [
        {
          ingredientId: ingredient1.id,
        },
        {
          ingredientId: ingredient2.id,
        },
      ],
    });

    const { accessToken } = await makeUserAndAuthenticate(app);

    const response = await request(app)
      .put(`/products/${product.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        ...product,
        name: 'updated-product',
        ingredients: [ingredient1.id, ingredient2.id],
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: product.id,
      }),
    );
  });
});
