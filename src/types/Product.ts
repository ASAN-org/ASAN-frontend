// This interface is used for both real and mock product data
export interface Product {
  id: string;
  name: string;
  price?: number;
  brand: string;
  imageUrl?: string;
  category: string;
  subCategory: string;
  discount?: number;
}

interface ProdutDetails {
  id: string;
}
