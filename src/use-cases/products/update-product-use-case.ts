import { AppError } from '@/errors/app-error';
import { IProductsRepository } from '@/repositories/products-repository';

interface IUpdateProductRequest {
  id: string;
  name: string;
  description: string;
  imagePath: string;
  priceInCents: number;
  categoryId: string;
  ingredients?: Array<{
    ingredientId: string;
  }>;
}

export class UpdateProductUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(product: IUpdateProductRequest) {
    const productExists = await this.productsRepository.findById(product.id);

    if (!productExists) {
      throw new AppError('Product not found', 404);
    }

    const updatedProduct = await this.productsRepository.update(product);

    return updatedProduct;
  }
}
