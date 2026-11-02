export type Category = 
  | 'All'
  | 'Joggers & Cargos'
  | '2-Piece Sets'
  | 'Streetwear Tees'
  | 'Wholesale Bundles'
  | 'Dresses & Shorts';

export interface Product {
  id: string;
  name: string;
  category: Category;
  pricePerPiece: number;
  wholesalePackPrice: number; // 6-piece starter pack
  bundlePrice?: number; // 25-piece or 50-piece bundle
  minQuantity: number;
  image: string;
  gallery?: string[];
  colors: string[];
  sizes: string[];
  description: string;
  fabric: string;
  badge?: 'Wholesale Bundle' | 'Bestseller' | 'New Drop' | 'Hot in Yaba';
  featured?: boolean;
}

export interface CartItem {
  cartItemId: string; // unique key: `${productId}-${size}-${color}`
  productId: string;
  name: string;
  image: string;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
  minQuantity: number;
}

export interface ToastNotification {
  id: string;
  message: string;
  productName: string;
  quantity: number;
  timestamp: number;
}
