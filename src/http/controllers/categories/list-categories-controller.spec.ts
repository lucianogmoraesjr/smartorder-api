import request from 'supertest';
import { makePrismaCategory } from 'test/factories/make-category';

import { app } from '@/app';

describe('List Categories (E2E)', () => {
  test('[GET] /categories', async () => {
    await makePrismaCategory({ name: 'Burgers' });

    const response = await request(app).get('/categories');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Burgers',
        }),
      ]),
    );
  });
});
