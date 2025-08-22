export interface ProductModel {
  id: string | number;
  title: string;
  quantity: string;
  price: string;
  url: string;
  category: string;
  sale?: string;
  description?: string;
}
