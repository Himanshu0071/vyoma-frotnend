export interface Variant {
  color: string;

  stock: number;

  images: string[];
}

export interface Product {
  _id: string;

  title: string;

  description: string;

  price: number;

  category: string;

  brand: string;

  gender: string;

  discount: number;

  featured: boolean;

  sizes: string[];

  variants: Variant[];

  createdAt?: string;

  updatedAt?: string;
}