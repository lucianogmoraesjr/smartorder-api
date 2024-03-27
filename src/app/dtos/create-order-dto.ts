export interface ICreateOrderDTO {
  table: number;
  products: Array<{
    product: string;
    quantity: number;
  }>;
}
