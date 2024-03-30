import { Order } from '@prisma/client';

import { ICreateOrderDTO } from '@/dtos/create-order-dto';

export interface IOrdersRepository {
  findAll(): Promise<Order[] | null>;
  create(data: ICreateOrderDTO): Promise<Order>;
  updateStatus(id: string, status: Order['status']): Promise<void>;
  delete(id: string): Promise<void>;
}
