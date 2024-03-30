import { randomUUID } from 'node:crypto';

import { $Enums, Order } from '@prisma/client';

import { IOrdersRepository } from '../orders-repository';

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
  updateStatus(id: string, status: $Enums.OrderStatus): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
