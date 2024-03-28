import { IProductsRepository } from '@/repositories/iproducts-repository';

export class ListProductsByCategoryUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(categoryId: string) {
    const products =
      await this.productsRepository.findAllByCategory(categoryId);

    return products;
  }
}
