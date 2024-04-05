import { ICategoriesRepository } from '../../repositories/categories-repository';

import { AppError } from '@/errors/app-error';

export class DeleteCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute(id: string) {
    const categoryExists = await this.categoriesRepository.findById(id);

    if (!categoryExists) {
      throw new AppError('Category not found', 404);
    }

    await this.categoriesRepository.delete(id);
  }
}
