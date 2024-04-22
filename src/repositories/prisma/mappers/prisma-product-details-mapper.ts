import {
  Category as PrismaCategory,
  Product as PrismaProduct,
} from '@prisma/client';

import { IIngredient } from '@/entities/ingredient';
import { IProductDetails } from '@/entities/product-details';

type PrismaProductDetails = PrismaProduct & {
  category: PrismaCategory | null;
  ingredients?: {
    ingredient: IIngredient;
  }[];
};

export class PrismaProductDetailsMapper {
  static toDomain(raw: PrismaProductDetails) {
    const productDetails: IProductDetails = {
      id: raw.id,
      name: raw.name,
      description: raw.description,
      priceInCents: raw.priceInCents,
      imagePath: raw.imagePath,
      category: raw.category,
      ingredients: raw.ingredients?.map(({ ingredient }) => ({
        id: ingredient.id,
        emoji: ingredient.emoji,
        name: ingredient.name,
      })),
    };

    return productDetails;
  }
}
