import { Prisma } from '@prisma/client';

import { IOrder } from '@/entities/order';

const archivedOrderDetails = Prisma.validator<Prisma.HistoryDefaultArgs>()({
  include: {
    order: {
      include: {
        products: {
          include: {
            product: {
              include: {
                category: true,
                ingredients: {
                  include: {
                    ingredient: true,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
});

type PrismaArchivedOrder = Prisma.HistoryGetPayload<
  typeof archivedOrderDetails
>;

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
