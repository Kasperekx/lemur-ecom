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
};

export interface ProductCardProps {
  product: Product;
}
