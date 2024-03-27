import { ICreateCategoryDTO } from '../dtos/create-category-dto';
import { Category } from '../models/category';

export class CategoriesRepository {
  private database: typeof Category;

  constructor() {
    this.database = Category;
  }

  async findAll() {
    const categories = await this.database.find();

    return categories;
  }

  async create({ name, icon }: ICreateCategoryDTO) {
    const category = await this.database.create({
      name,
      icon,
    });

    return category;
  }
}
