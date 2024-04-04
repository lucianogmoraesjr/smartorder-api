import { randomUUID } from 'node:crypto';

import { faker } from '@faker-js/faker';
import { Order } from '@prisma/client';

import { makeProduct } from './make-product';

import { prisma } from '@/lib/prisma';

type OrderWithProducts = Order & {
  products: Array<{
    productId: string;
    quantity: number;
  }>;
};

export function makeOrder(
  override: Partial<OrderWithProducts> = {},
  id?: string,
) {
  const product1 = makeProduct();
  const product2 = makeProduct();

  const order: OrderWithProducts = {
    id: id ?? randomUUID(),
    table: faker.helpers.rangeToNumber({ min: 1, max: 20 }),
    status: 'WAITING',
    createdAt: new Date(),
    updatedAt: new Date(),
    products: [
      {
        productId: product1.id,
        quantity: 1,
      },
      {
        productId: product2.id,
        quantity: 1,
      },
    ],
    ...override,
  };

  return order;
}

type PartialOrderWithProducts = Partial<Omit<OrderWithProducts, 'products'>> &
  Pick<OrderWithProducts, 'products'>;

export async function makePrismaOrder(
  data: PartialOrderWithProducts,
): Promise<Order> {
  const order = makeOrder(data);

  const createdOrder = await prisma.order.create({
    data: {
      table: order.table,
      status: order.status,
      products: {
        create: order.products.map(product => ({
          product: {
            connect: { id: product.productId },
          },
          quantity: product.quantity,
        })),
      },
    },
  });

  return createdOrder;
}
