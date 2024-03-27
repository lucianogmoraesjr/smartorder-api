import { ICreateProductDTO } from '../dtos/create-product-dto';
import { Product } from '../models/product';

export class ProductsRepository {
  private database: typeof Product;

  constructor() {
    this.database = Product;
  }

  async findAll() {
    const products = await this.database.find();

    return products;
  }

  async findAllByCategory(categoryId: string) {
    const products = await this.database
      .find()
      .where('category')
      .equals(categoryId);

    return products;
  }

  async create(data: ICreateProductDTO) {
    const product = await this.database.create(data);

    return product;
  }
}
