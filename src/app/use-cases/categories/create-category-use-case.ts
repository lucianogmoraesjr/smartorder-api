import { ICreateCategoryDTO } from '../../dtos/create-category-dto';
import { ICategoriesRepository } from '../../repositories/categories-repository';

import { AppError } from '@/app/errors/app-error';

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute({ name, emoji }: ICreateCategoryDTO) {
    if (!name) {
      throw new AppError('Name is required.', 400);
    }

    if (!emoji) {
      throw new AppError('Emoji is required.', 400);
    }

    const category = await this.categoriesRepository.create({ name, emoji });

    return category;
  }
}
