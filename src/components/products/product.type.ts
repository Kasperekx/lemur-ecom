export type Product = {
  id: number;
  name: string;
  description: string;
  price?: string;
  images: {
    src: string;
  }[];
  slug: string;
  short_description: string;
  regular_price: string;
  sale_price: string;
  stock_status: 'instock' | 'outofstock';
  stock_quantity?: number;
  attributes: {
    name: string;
    options: string[];
  }[];
};

export interface ProductCardProps {
  product: Product;
}
