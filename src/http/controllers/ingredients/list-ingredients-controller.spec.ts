import request from 'supertest';
import { makePrismaIngredient } from 'test/factories/make-ingredient';
import { makeUserAndAuthenticate } from 'test/factories/make-user-and-authenticate';

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

    const { accessToken } = await makeUserAndAuthenticate(app);

    const response = await request(app)
      .get('/ingredients')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });
});
