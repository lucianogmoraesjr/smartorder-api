import request from 'supertest';

import { app } from '@/app';

describe('Create Ingredient (E2E)', () => {
  test('[POST] /ingredients', async () => {
    const response = await request(app).post('/ingredients').send({
      name: 'Test',
      emoji: '🧪',
    });

    expect(response.status).toBe(201);
  });
});
