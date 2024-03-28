import { Prisma, Product } from '@prisma/client';

export interface IProductsRepository {
  findAll(): Promise<Product[] | null>;
  findAllByCategory(categoryId: string): Promise<Product[] | null>;
  create(data: Prisma.ProductUncheckedCreateInput): Promise<Product>;
}
