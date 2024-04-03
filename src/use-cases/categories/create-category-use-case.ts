import { ICreateCategoryDTO } from '../../dtos/create-category-dto';
import { ICategoriesRepository } from '../../repositories/categories-repository';

import { AppError } from '@/errors/app-error';

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute({ name, emoji }: ICreateCategoryDTO) {
    const categoryAlreadyExists =
      await this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists.', 400);
    }

    const category = await this.categoriesRepository.create({ name, emoji });

    return category;
  }
}
