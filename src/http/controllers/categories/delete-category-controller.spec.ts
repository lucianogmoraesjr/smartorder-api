import request from 'supertest';
import { makePrismaCategory } from 'test/factories/make-category';

import { app } from '@/app';
import { prisma } from '@/lib/prisma';

describe('Delete Category (E2E)', () => {
  test('[DELETE] /categories/:categoryId', async () => {
    const category = await makePrismaCategory({ name: 'Burgers' });

    const response = await request(app).delete(`/categories/${category.id}`);

    expect(response.status).toBe(204);

    const categoryOnDatabase = await prisma.category.findUnique({
      where: {
        id: category.id,
      },
    });

    expect(categoryOnDatabase).toBeFalsy();
  });
});
