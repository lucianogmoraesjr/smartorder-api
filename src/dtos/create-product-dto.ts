export interface ICreateProductDTO {
  name: string;
  description: string;
  imagePath: string;
  priceInCents: number;
  categoryId: string;
  ingredients?: Array<{
    ingredientId: string;
  }>;
}
