export interface CartPatch {
  quantity: number;
}

export interface CartPost {
  cart: string;
  product_id: string;
  quantity: number;
}
