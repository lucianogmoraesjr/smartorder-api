import { Prisma } from '@prisma/client';

import { IOrderWithDetails } from '@/entities/order-with-details';

const archivedOrderWithDetails = Prisma.validator<Prisma.HistoryDefaultArgs>()({
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

type PrismaArchivedOrderWithDetails = Prisma.HistoryGetPayload<
  typeof archivedOrderWithDetails
>;

export class PrismaArchivedOrderWithDetailsMapper {
  static toDomain(raw: PrismaArchivedOrderWithDetails): IOrderWithDetails {
    const order: IOrderWithDetails = {
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
