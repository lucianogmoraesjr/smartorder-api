import { Order } from '@prisma/client';

import { IOrdersRepository, IUpdateStatusRequest } from '../orders-repository';

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

  async updateStatus(data: IUpdateStatusRequest): Promise<void> {
    await prisma.order.update({
      where: {
        id: data.id,
      },
      data: {
        status: data.status,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.order.delete({
      where: {
        id,
      },
    });
  }
}
