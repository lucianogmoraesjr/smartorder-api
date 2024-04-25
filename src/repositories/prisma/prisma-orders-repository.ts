import { Order } from '@prisma/client';

import { IOrdersRepository, IUpdateStatusRequest } from '../orders-repository';

import { ICreateOrderDTO } from '@/dtos/create-order-dto';
import { prisma } from '@/lib/prisma';

export class PrismaOrdersRepository implements IOrdersRepository {
  async findAll(): Promise<Order[] | null> {
    const orders = await prisma.order.findMany({
      include: {
        products: {
          select: {
            product: true,
            quantity: true,
          },
        },
      },
      where: {
        archivedAt: null,
      },
    });

    if (!orders) {
      return null;
    }

    return orders;
  }

  async findById(id: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
    });

    if (!order) {
      return null;
    }

    return order;
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

  async markAsArchived(id: string): Promise<void> {
    await prisma.order.update({
      where: {
        id,
      },
      data: {
        archivedAt: new Date(),
      },
    });
  }

  async markManyAsArchived(ids: string[]): Promise<void> {
    await prisma.order.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        archivedAt: new Date(),
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
