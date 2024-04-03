import { Order } from '@prisma/client';

import { ICreateOrderDTO } from '@/dtos/create-order-dto';

export interface IUpdateStatusRequest {
  id: string;
  status: 'WAITING' | 'IN_PRODUCTION' | 'DONE';
}

export interface IOrdersRepository {
  findAll(): Promise<Order[] | null>;
  create(data: ICreateOrderDTO): Promise<Order>;
  updateStatus(data: IUpdateStatusRequest): Promise<void>;
  delete(id: string): Promise<void>;
}
