import { CategoriesRepository } from '../../repositories/categories-repository';

export class ListCategoriesUseCase {
  private categoriesRepository: CategoriesRepository;

  constructor() {
    this.categoriesRepository = new CategoriesRepository();
  }

  async execute() {
    const categories = await this.categoriesRepository.findAll();

    return categories;
  }
}
