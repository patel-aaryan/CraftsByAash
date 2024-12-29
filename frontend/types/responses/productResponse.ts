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
  thumbnail: string;
  media: Media[];
}

export interface Media {
  media_id: string;
  media_type: string;
}

export interface ProductResults {
  count: number;
  next: string;
  previous: string;
  results: Product[];
}

export interface SimpleProduct {
  name: string;
  price: number;
  product_id: string;
}
