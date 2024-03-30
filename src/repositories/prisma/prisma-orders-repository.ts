import { $Enums, Order } from '@prisma/client';

import { IOrdersRepository } from '../orders-repository';

import { ICreateOrderDTO } from '@/dtos/create-order-dto';
import { prisma } from '@/lib/prisma';

export class PrismaOrdersRepository implements IOrdersRepository {
  async findAll(): Promise<Order[] | null> {
    const orders = await prisma.order.findMany();

    if (!orders) {
      return null;
    }

    return orders;
  }

  async create(data: ICreateOrderDTO): Promise<Order> {
    const order = await prisma.order.create({
      data: {
        table: data.table,
        products: {
          create: data.products.map(product => ({
            quantity: product.quantity,
            product: {
              connect: { id: product.productId },
            },
          })),
        },
      },
      include: {
        products: {
          select: {
            product: true,
          },
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
