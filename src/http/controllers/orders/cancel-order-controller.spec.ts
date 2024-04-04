import request from 'supertest';
import { makePrismaCategory } from 'test/factories/make-category';
import { makePrismaOrder } from 'test/factories/make-order';
import { makePrismaProduct } from 'test/factories/make-product';

import { app } from '@/app';
import { prisma } from '@/lib/prisma';

describe('Cancel Order (E2E)', () => {
  test('[DELETE] /orders/:id', async () => {
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

    const response = await request(app).delete(`/orders/${order.id}`);

    const deletedOrder = await prisma.order.findFirst({
      where: {
        id: order.id,
      },
    });

    expect(response.status).toBe(204);
    expect(deletedOrder).toBe(null);
  });
});
