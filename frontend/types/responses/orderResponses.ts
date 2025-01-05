import { AddressDetails } from "../forms";
import { SimpleProduct } from "./productResponse";

export interface Order {
  id: number;
  user: number;
  placed_at: Date;
  payment_status: string;
  total: number;
  tax: number;
  phone: string;
  shipping_address: AddressDetails;
  billing_address: AddressDetails;
  items: OrderItem[];
}

interface OrderItem {
  id: number;
  price: number;
  quantity: number;
  product: SimpleProduct;
}
