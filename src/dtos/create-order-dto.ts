export interface ICreateOrderDTO {
  table: number;
  products: Array<{
    productId: string;
    quantity: number;
  }>;
}
