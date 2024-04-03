import { ICreateProductDTO } from '@/dtos/create-product-dto';
import { IProductsRepository } from '@/repositories/products-repository';

export class CreateProductUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(data: ICreateProductDTO) {
    const product = await this.productsRepository.create(data);

    return product;
  }
}
