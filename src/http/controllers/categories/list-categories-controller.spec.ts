import request from 'supertest';
import { makePrismaCategory } from 'test/factories/make-category';
import { makeUserAndAuthenticate } from 'test/factories/make-user-and-authenticate';

import { app } from '@/app';

describe('List Categories (E2E)', () => {
  test('[GET] /categories', async () => {
    await makePrismaCategory({ name: 'Burgers' });

    const { accessToken } = await makeUserAndAuthenticate(app);

    const response = await request(app)
      .get('/categories')
      .set('Authorization', `Bearer ${accessToken}`);

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
