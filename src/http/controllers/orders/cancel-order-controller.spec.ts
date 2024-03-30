import request from 'supertest';
import { makePrismaOrder } from 'test/factories/make-order';

import { app } from '@/app';
import { prisma } from '@/lib/prisma';

describe('Cancel Order (E2E)', () => {
  test('[DELETE] /orders/:id', async () => {
    const order = await makePrismaOrder();

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
