import { IProductsRepository } from '@/repositories/products-repository';

export class ListProductsUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute() {
    const products = await this.productsRepository.findAll();

    return products;
  }
}
