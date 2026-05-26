export interface Product {
    _id: string;
  
    title: string;
  
    description: string;
  
    price: number;
  
    category: string;
  
    images: string[];
  
    sizes: string[];
  
    colors: string[];
  
    stock: number;
  
    featured: boolean;
  }