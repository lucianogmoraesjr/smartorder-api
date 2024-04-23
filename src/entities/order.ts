import { IProductDetails } from './product-details';

export interface IOrder {
  id: string;
  table: number;
  status: 'WAITING' | 'IN_PRODUCTION' | 'DONE';
  createdAt: Date;
  updatedAt: Date;
  archivedAt: Date | null;
  products: Array<{
    quantity: number;
    product: IProductDetails;
  }>;
}
