import { IProductsRepository } from '@/repositories/products-repository';

export class ListProductsByCategoryUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(categoryId: string) {
    const products =
      await this.productsRepository.findAllByCategory(categoryId);

    return products;
  }
}
