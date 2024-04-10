import { AppError } from '@/errors/app-error';
import { IProductsRepository } from '@/repositories/products-repository';

export class DeleteProductUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(productId: string) {
    const productExists = await this.productsRepository.findById(productId);

    if (!productExists) {
      throw new AppError('Product not found', 404);
    }

    await this.productsRepository.delete(productId);
  }
}
