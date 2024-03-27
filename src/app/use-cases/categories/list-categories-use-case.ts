import { ICategoriesRepository } from '@/app/repositories/categories-repository';

export class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute() {
    const categories = await this.categoriesRepository.findAll();

    return categories;
  }
}
