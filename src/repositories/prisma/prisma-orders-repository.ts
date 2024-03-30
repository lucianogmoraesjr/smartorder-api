import { $Enums, Order } from '@prisma/client';

import { IOrdersRepository } from '../orders-repository';

import { ICreateOrderDTO } from '@/dtos/create-order-dto';
import { prisma } from '@/lib/prisma';

export class PrismaOrdersRepository implements IOrdersRepository {
  findAll(): Promise<Order[] | null> {
    throw new Error('Method not implemented.');
  }
  async create(data: ICreateOrderDTO): Promise<Order> {
    const order = await prisma.order.create({
      data: {
        table: data.table,
        orderProducts: {
          create: data.products.map(product => ({
            quantity: product.quantity,
            product: {
              connect: { id: product.productId },
            },
          })),
        },
      },
    });

    return order;
  }
  updateStatus(id: string, status: $Enums.OrderStatus): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
