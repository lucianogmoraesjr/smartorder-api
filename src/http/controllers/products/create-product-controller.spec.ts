import request from 'supertest';
import { makePrismaCategory } from 'test/factories/make-category';
import { makePrismaIngredient } from 'test/factories/make-ingredient';
import { makeProductWithIngredients } from 'test/factories/make-product-with-ingredients';

import { app } from '@/app';

describe('Create Product (E2E)', () => {
  test('[POST] /products', async () => {
    const category = await makePrismaCategory();

    const [ingredient1, ingredient2, ingredient3] = await Promise.all([
      makePrismaIngredient(),
      makePrismaIngredient(),
      makePrismaIngredient(),
    ]);

    const product = makeProductWithIngredients({
      categoryId: category.id,
      ingredients: [
        {
          ingredientId: ingredient1.id,
        },
        {
          ingredientId: ingredient2.id,
        },
        {
          ingredientId: ingredient3.id,
        },
      ],
    });

    const response = await request(app).post('/products').send(product);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: expect.any(String),
    });
  });
});
