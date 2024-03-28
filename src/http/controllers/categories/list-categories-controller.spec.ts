import request from 'supertest';

import { app } from '@/app';

describe('List Categories (E2E)', () => {
  test('[GET] /categories', async () => {
    await request(app).post('/categories').send({
      name: 'Burgers',
      emoji: '🍔',
    });

    const response = await request(app).get('/categories');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Burgers',
          emoji: '🍔',
        }),
      ]),
    );
  });
});
