import request from 'supertest';
import { makePrismaOrder } from 'test/factories/make-order';

import { app } from '@/app';
import { prisma } from '@/lib/prisma';

describe('Update Order Status (E2E)', () => {
  test('[PATCH] /orders/:id', async () => {
    const order = await makePrismaOrder();

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
