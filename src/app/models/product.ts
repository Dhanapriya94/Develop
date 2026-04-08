export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;

  // 🔥 NEW
  category?: string;
  active?: boolean;
  image?: string;
}