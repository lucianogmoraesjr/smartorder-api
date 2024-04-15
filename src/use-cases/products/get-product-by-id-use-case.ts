import { AppError } from '@/errors/app-error';
import { IProductsRepository } from '@/repositories/products-repository';

export class GetProductByIdUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(productId: string) {
    const product = await this.productsRepository.findById(productId);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    return product;
  }
}
