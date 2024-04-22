import { ICategory } from './category';
import { IIngredient } from './ingredient';

export interface IProductDetails {
  id: string;
  name: string;
  description: string;
  imagePath: string;
  priceInCents: number;
  category: ICategory | null;
  ingredients?: Array<IIngredient>;
}
