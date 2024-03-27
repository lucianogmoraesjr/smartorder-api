export interface ICreateProductDTO {
  name: string;
  description: string;
  imagePath: string;
  price: number;
  category: string;
  ingredients: Array<{
    name: string;
    icon: string;
  }>;
}
