import { Order, Prisma } from '@prisma/client';

export interface IOrdersRepository {
  findAll(): Promise<Order[] | null>;
  create(data: Prisma.OrderUncheckedCreateInput): Promise<Order>;
  updateStatus(id: string, status: Order['status']): Promise<void>;
  delete(id: string): Promise<void>;
}
