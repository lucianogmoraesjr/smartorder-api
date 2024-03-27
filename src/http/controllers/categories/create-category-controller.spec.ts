import request from 'supertest';

import { app } from '@/app';

describe('Create Category (E2E)', () => {
  test('[POST] /categories', async () => {
    const response = await request(app).post('/categories').send({
      name: 'Test',
      emoji: '🧪',
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Test',
        emoji: '🧪',
      }),
    );
  });
});
