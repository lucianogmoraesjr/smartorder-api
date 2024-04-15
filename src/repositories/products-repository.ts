import { Product } from '@prisma/client';

import {
  ICreateProductDTO,
  IUpdateProductDTO,
} from '@/dtos/create-product-dto';

export interface IProductsRepository {
  findAll(): Promise<Product[] | null>;
  findAllByCategory(categoryId: string): Promise<Product[] | null>;
  findById(id: string): Promise<Product | null>;
  findByName(name: string): Promise<Product | null>;
  create(data: ICreateProductDTO): Promise<Product>;
  update(data: IUpdateProductDTO): Promise<Product>;
  delete(id: string): Promise<void>;
}
