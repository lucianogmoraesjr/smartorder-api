import { randomUUID } from 'node:crypto';

import { Order } from '@prisma/client';

import { IOrdersRepository, IUpdateStatusRequest } from '../orders-repository';

import { ICreateOrderDTO } from '@/dtos/create-order-dto';

type InMemoryOrder = Order & {
  products: Array<{
    productId: string;
    quantity: number;
  }>;
};

export class InMemoryOrdersRepository implements IOrdersRepository {
  public orders: InMemoryOrder[] = [];

  async findAll(): Promise<Order[] | null> {
    return this.orders;
  }

  async create(data: ICreateOrderDTO): Promise<Order> {
    const order: InMemoryOrder = {
      id: randomUUID(),
      table: data.table,
      status: 'WAITING',
      products: data.products,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.orders.push(order);

    return order;
  }
  async updateStatus(data: IUpdateStatusRequest): Promise<void> {
    const orderIndex = this.orders.findIndex(order => order.id === data.id);

    this.orders[orderIndex].status = data.status;
  }
  async delete(id: string): Promise<void> {
    const orderIndex = this.orders.findIndex(order => order.id === id);

    this.orders.splice(orderIndex, 1);
  }
}