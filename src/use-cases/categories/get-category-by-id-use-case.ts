import { ICategoriesRepository } from '../../repositories/categories-repository';

import { AppError } from '@/errors/app-error';

export class GetCategoryByIdUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute(id: string) {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new AppError('Category not found', 404);
    }

    return category;
  }
}
