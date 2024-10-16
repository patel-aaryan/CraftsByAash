export interface CartResults {
  cart_id: string;
  items: CartItem[];
  subtotal: number;
}

export interface CartItem {
  id: number;
  cart: string;
  product: {
    product_id: string;
    name: string;
    price: number;
  };
  quantity: number;
  total: number;
}