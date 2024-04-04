import { AppError } from '@/errors/app-error';
import { ICategoriesRepository } from '@/repositories/categories-repository';
import { IProductsRepository } from '@/repositories/products-repository';

export class ListProductsByCategoryUseCase {
  constructor(
    private productsRepository: IProductsRepository,
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute(categoryId: string) {
    const categoryExists = await this.categoriesRepository.findById(categoryId);

    if (!categoryExists) {
      throw new AppError('Category not found', 404);
    }

    const products =
      await this.productsRepository.findAllByCategory(categoryId);

    return products;
  }
}
