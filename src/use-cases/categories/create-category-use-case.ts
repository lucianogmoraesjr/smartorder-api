import { ICreateCategoryDTO } from '../../dtos/create-category-dto';
import { ICategoriesRepository } from '../../repositories/categories-repository';

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute({ name, emoji }: ICreateCategoryDTO) {
    const category = await this.categoriesRepository.create({ name, emoji });

    return category;
  }
}
