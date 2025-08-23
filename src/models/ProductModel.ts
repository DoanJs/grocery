export interface ProductModel {
  id: string | number;
  title: string;
  quantity: string;
  price: number;
  url: string;
  category: string;
  star: number,
  sale?: string;
  description?: string;
}
