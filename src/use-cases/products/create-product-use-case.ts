import { ICreateProductDTO } from '@/dtos/create-product-dto';
import { AppError } from '@/errors/app-error';
import { ICategoriesRepository } from '@/repositories/categories-repository';
import { IProductsRepository } from '@/repositories/products-repository';

export class CreateProductUseCase {
  constructor(
    private productsRepository: IProductsRepository,
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute(data: ICreateProductDTO) {
    const productAlreadyExists = await this.productsRepository.findByName(
      data.name,
    );

    if (productAlreadyExists) {
      throw new AppError('Product already exists', 400);
    }

    const categoryExists = await this.categoriesRepository.findById(
      data.categoryId,
    );

    if (!categoryExists) {
      throw new AppError('Category does not exists', 400);
    }

    const product = await this.productsRepository.create(data);

    return product;
  }
}
