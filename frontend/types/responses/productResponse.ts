export interface Product {
  product_id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  colour: string;
  shape: string;
  width: number;
  height: number;
  photo_id: number;
}

export interface ProductResults {
  count: number;
  next: string;
  previous: string;
  results: Product[];
}
