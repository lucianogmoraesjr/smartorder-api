import { CategoryPresenter } from './category-presenter';
import { ImagePathPresenter } from './image-path-presenter';
import { IngredientPresenter } from './ingredient-presenter';

import { IProductDetails } from '@/entities/product-details';

export class ProductPresenter {
  static toHttp(product: IProductDetails) {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      imagePath: ImagePathPresenter.toHttp(product.imagePath),
      priceInCents: product.priceInCents,
      category: CategoryPresenter.toHttp(product.category),
      ingredients: product.ingredients?.map(IngredientPresenter.toHttp),
    };
  }
}
