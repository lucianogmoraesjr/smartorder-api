import request from 'supertest';

import { app } from '@/app';

describe('List Categories (E2E)', () => {
  test('[GET] /categories', async () => {
    const response = await request(app).get('/categories');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'clua7qhge0001ovnwsomq5qv7',
          name: 'Burgers',
          emoji: '🍔',
        }),
      ]),
    );
  });
});
