import { ProductsRepository } from '../../repositories/products-repository';

export class ListProductsByCategoryUseCase {
  private productsRepository: ProductsRepository;

  constructor() {
    this.productsRepository = new ProductsRepository();
  }

  async execute(categoryId: string) {
    const products =
      await this.productsRepository.findAllByCategory(categoryId);

    return products;
  }
}
