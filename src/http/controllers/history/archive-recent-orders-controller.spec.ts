import request from 'supertest';
import { makePrismaCategory } from 'test/factories/make-category';
import { makePrismaOrder } from 'test/factories/make-order';
import { makePrismaProduct } from 'test/factories/make-product';
import { makeUserAndAuthenticate } from 'test/factories/make-user-and-authenticate';

import { app } from '@/app';
import { prisma } from '@/lib/prisma';

describe('Archive Recent Orders Controller (E2E)', () => {
  test('[PATCH] /history/archive-recent', async () => {
    const category = await makePrismaCategory({
      name: 'category-1',
    });

    const product = await makePrismaProduct({
      name: 'product-1',
      categoryId: category.id,
    });

    const order1 = await makePrismaOrder({
      products: [
        {
          productId: product.id,
          quantity: 2,
        },
      ],
    });

    const order2 = await makePrismaOrder({
      products: [
        {
          productId: product.id,
          quantity: 2,
        },
      ],
    });

    const order3 = await makePrismaOrder({
      products: [
        {
          productId: product.id,
          quantity: 2,
        },
      ],
    });

    const ordersToArchive = [order1.id, order2.id, order3.id];

    const { accessToken } = await makeUserAndAuthenticate(app);

    const response = await request(app)
      .patch('/history/archive-recent')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ orderIds: ordersToArchive });

    expect(response.status).toBe(204);

    const ordersOnDatabase = await prisma.order.findMany({
      where: {
        id: {
          in: ordersToArchive,
        },
      },
    });

    expect(ordersOnDatabase).toEqual([
      expect.objectContaining({
        archivedAt: expect.any(Date),
      }),
      expect.objectContaining({
        archivedAt: expect.any(Date),
      }),
      expect.objectContaining({
        archivedAt: expect.any(Date),
      }),
    ]);

    const ordersOnHistory = await prisma.history.findMany({
      where: {
        orderId: {
          in: ordersToArchive,
        },
      },
    });

    expect(ordersOnHistory).toHaveLength(3);
  });
});
