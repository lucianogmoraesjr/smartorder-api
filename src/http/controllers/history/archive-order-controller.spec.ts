import request from 'supertest';
import { makePrismaCategory } from 'test/factories/make-category';
import { makePrismaOrder } from 'test/factories/make-order';
import { makePrismaProduct } from 'test/factories/make-product';
import { makeUserAndAuthenticate } from 'test/factories/make-user-and-authenticate';

import { app } from '@/app';
import { prisma } from '@/lib/prisma';

describe('Archive Order Controller (E2E)', () => {
  test('[PATCH] /history/archive', async () => {
    const category = await makePrismaCategory({
      name: 'category-1',
    });

    const product = await makePrismaProduct({
      name: 'product-1',
      categoryId: category.id,
    });

    const order = await makePrismaOrder({
      products: [
        {
          productId: product.id,
          quantity: 2,
        },
      ],
    });

    const { accessToken } = await makeUserAndAuthenticate(app);

    const response = await request(app)
      .patch('/history/archive')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        orderId: order.id,
      });

    expect(response.status).toBe(204);

    const orderOnDatabase = await prisma.order.findUnique({
      where: {
        id: order.id,
      },
    });

    expect(orderOnDatabase).toEqual(
      expect.objectContaining({
        archivedAt: expect.any(Date),
      }),
    );

    const orderOnHistory = await prisma.history.findFirst({
      where: {
        orderId: order.id,
      },
    });

    expect(orderOnHistory).toBeTruthy();
  });
});
