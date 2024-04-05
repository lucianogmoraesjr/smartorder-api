import { ICategoriesRepository } from '../../repositories/categories-repository';

import { AppError } from '@/errors/app-error';

interface IUpdateCategoryUseCaseRequest {
  id: string;
  name: string;
  emoji: string;
}

export class UpdateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute({ id, name, emoji }: IUpdateCategoryUseCaseRequest) {
    const categoryExists = await this.categoriesRepository.findById(id);

    if (!categoryExists) {
      throw new AppError('Category not found', 404);
    }

    const category = await this.categoriesRepository.update({
      id,
      name,
      emoji,
    });

    return category;
  }
}
