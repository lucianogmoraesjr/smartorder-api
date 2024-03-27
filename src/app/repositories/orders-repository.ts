import { ICreateOrderDTO } from '../dtos/create-order-dto';
import { Order } from '../models/order';

export class OrdersRepository {
  private database: typeof Order;

  constructor() {
    this.database = Order;
  }

  async findAll() {
    const orders = await this.database
      .find()
      .sort({ createdAt: 1 })
      .populate('products.product');

    return orders;
  }

  async create(data: ICreateOrderDTO) {
    const order = await this.database.create(data);

    return order;
  }

  async updateStatus(id: string, status: string) {
    await this.database.findByIdAndUpdate(id, { status });
  }

  async delete(id: string) {
    await this.database.findByIdAndDelete(id);
  }
}
