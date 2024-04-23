import {
  History as PrismaHistory,
  Order as PrismaOrder,
  Product as PrismaProduct,
} from '@prisma/client';

import { IOrder } from '@/entities/order';

type PrismaArchivedOrder = PrismaHistory & {
  order: PrismaOrder & {
    products: {
      id: string;
      orderId: string;
      productId: string;
      quantity: number;
      product: PrismaProduct & {
        ingredients: ({
          ingredient: {
            id: string;
            name: string;
            emoji: string;
          };
        } & {
          id: string;
          productId: string;
          ingredientId: string;
        })[];
        category: {
          id: string;
          name: string;
          emoji: string;
        } | null;
      };
    }[];
  };
};

export class PrismaArchivedOrderMapper {
  static toDomain(raw: PrismaArchivedOrder): IOrder {
    const order: IOrder = {
      id: raw.order.id,
      table: raw.order.table,
      status: raw.order.status,
      createdAt: raw.order.createdAt,
      updatedAt: raw.order.updatedAt,
      archivedAt: raw.order.archivedAt,
      products: raw.order.products.map(({ quantity, product }) => ({
        quantity: quantity,
        product: {
          id: product.id,
          name: product.name,
          description: product.description,
          imagePath: product.imagePath,
          priceInCents: product.priceInCents,
          category: product.category,
          ingredients: product.ingredients.map(({ ingredient }) => ingredient),
        },
      })),
    };

    return order;
  }
}
