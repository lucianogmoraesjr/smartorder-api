import { ICreateProductDTO } from '../../dtos/create-product-dto';
import { ProductsRepository } from '../../repositories/products-repository';

export class CreateProductUseCase {
  private productsRepository: ProductsRepository;

  constructor() {
    this.productsRepository = new ProductsRepository();
  }

  async execute(data: ICreateProductDTO) {
    const product = await this.productsRepository.create(data);

    return product;
  }
}
