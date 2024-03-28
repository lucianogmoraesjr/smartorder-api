import request from 'supertest';

import { app } from '@/app';

describe('List Products (E2E)', () => {
  test('[GET] /products', async () => {
    const response = await request(app).get('/products');

    expect(response.status).toBe(200);
  });
});
