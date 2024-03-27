import { ICreateCategoryDTO } from '../../dtos/create-category-dto';
import { CategoriesRepository } from '../../repositories/categories-repository';

export class CreateCategoryUseCase {
  private categoriesRepository: CategoriesRepository;

  constructor() {
    this.categoriesRepository = new CategoriesRepository();
  }

  async execute(data: ICreateCategoryDTO) {
    const category = await this.categoriesRepository.create(data);

    return category;
  }
}
