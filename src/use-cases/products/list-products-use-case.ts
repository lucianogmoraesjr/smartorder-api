import { ProductsRepository } from '../../repositories/products-repository';

export class ListProductsUseCase {
  private productsRepository: ProductsRepository;

  constructor() {
    this.productsRepository = new ProductsRepository();
  }

  async execute() {
    const products = await this.productsRepository.findAll();

    return products;
  }
}
