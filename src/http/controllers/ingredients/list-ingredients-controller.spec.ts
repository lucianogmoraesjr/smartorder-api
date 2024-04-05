import request from 'supertest';
import { makePrismaIngredient } from 'test/factories/make-ingredient';

import { app } from '@/app';

describe('List Ingredients (E2E)', () => {
  test('[GET] /ingredients', async () => {
    await Promise.all([
      makePrismaIngredient({
        name: 'ingredient-1',
      }),
      makePrismaIngredient({
        name: 'ingredient-2',
      }),
    ]);

    const response = await request(app).get('/ingredients');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });
});
