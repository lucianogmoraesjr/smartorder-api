import { Order, Product } from '@prisma/client';

import { IOrder } from '@/entities/order';

type PrismaOrder = Order & {
  quantity: number;
  products: Array<{
    product: Product;
  }>;
};

// const archivedOrders: ({
//   order: {
//       id: string;
//       table: number;
//       status: $Enums.OrderStatus;
//       createdAt: Date;
//       updatedAt: Date;
//       archivedAt: Date | null;
//   };
// } & {
//   id: string;
//   orderId: string;
// })[]

export class PrismaOrderMapper {
  static toDomain(raw: PrismaOrder): IOrder {
    const order: IOrder = {};

    return order;
  }
}

// const archivedOrders: ({
//   order: {
//       products: ({
//           product: {
//               id: string;
//               name: string;
//               description: string;
//               imagePath: string;
//               priceInCents: number;
//               categoryId: string | null;
//           };
//       } & {
//           id: string;
//           orderId: string;
//           productId: string;
//           quantity: number;
//       })[];
//   } & {
//       ...;
//   };
// } & {
//   ...;
// })[]
