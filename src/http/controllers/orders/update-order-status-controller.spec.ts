import request from 'supertest';
import { makePrismaCategory } from 'test/factories/make-category';
import { makePrismaOrder } from 'test/factories/make-order';
import { makePrismaProduct } from 'test/factories/make-product';

import { app } from '@/app';
import { prisma } from '@/lib/prisma';

describe('Update Order Status (E2E)', () => {
  test('[PATCH] /orders/:id', async () => {
    const [category1, category2] = await Promise.all([
      makePrismaCategory({
        name: 'category-1',
      }),
      makePrismaCategory({
        name: 'category-2',
      }),
    ]);

    const [product1, product2] = await Promise.all([
      makePrismaProduct({
        name: 'product-1',
        categoryId: category1.id,
      }),
      makePrismaProduct({
        name: 'product-2',
        categoryId: category2.id,
      }),
    ]);

    const order = await makePrismaOrder({
      products: [
        {
          productId: product1.id,
          quantity: 1,
        },
        {
          productId: product2.id,
          quantity: 2,
        },
      ],
    });

    const response = await request(app)
      .patch(`/orders/${order.id}`)
      .send({ status: 'IN_PRODUCTION' });

    const updatedOrderStatus = await prisma.order.findFirst({
      where: {
        id: order.id,
      },
    });

    expect(response.status).toBe(204);
    expect(updatedOrderStatus?.status).toBe('IN_PRODUCTION');
  });
});
