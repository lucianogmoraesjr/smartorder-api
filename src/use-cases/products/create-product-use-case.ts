import { ICreateProductDTO } from '@/dtos/create-product-dto';
import { IProductsRepository } from '@/repositories/iproducts-repository';

export class CreateProductUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(data: ICreateProductDTO) {
    const product = await this.productsRepository.create(data);

    return product;
  }
}
