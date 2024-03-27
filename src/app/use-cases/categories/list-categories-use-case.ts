import { ICategoriesRepository } from '@/app/repositories/icategories-repository';

export class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute() {
    const categories = await this.categoriesRepository.findAll();

    return categories;
  }
}
