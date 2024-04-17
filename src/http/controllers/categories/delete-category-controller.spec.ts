import request from 'supertest';
import { makePrismaCategory } from 'test/factories/make-category';
import { makeUserAndAuthenticate } from 'test/factories/make-user-and-authenticate';

import { app } from '@/app';
import { prisma } from '@/lib/prisma';

describe('Delete Category (E2E)', () => {
  test('[DELETE] /categories/:categoryId', async () => {
    const category = await makePrismaCategory({ name: 'Burgers' });

    const { accessToken } = await makeUserAndAuthenticate(app);

    const response = await request(app)
      .delete(`/categories/${category.id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(204);

    const categoryOnDatabase = await prisma.category.findUnique({
      where: {
        id: category.id,
      },
    });

    expect(categoryOnDatabase).toBeFalsy();
  });
});
