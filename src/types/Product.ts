// This interface is used for both real and mock product data
export interface Product {
  id: string;
  name: string;
  price: number;
  brand: string;
  imageUrl?: string;
  category: string;
  subCategory: string;
  discount?: number;
  // New fields for product detail page
  description?: string;
  specifications?: Record<string, string>;
  images?: string[];
  stock?: number;
  rating?: number;
  reviewCount?: number;
  weight?: string;
  dimensions?: string;
  warranty?: string;
  color?: string;
  material?: string;
  features?: string[];
  tags?: string[];
}

// interface ProdutDetails {
//   id: string;
// }
