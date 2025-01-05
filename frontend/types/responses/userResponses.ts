export interface UserMe {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  username: string;
  addresses: UserAddress;
}

export interface UserAddress {
  address_id: string;
  full_name: string;
  street_number: number;
  street_name: string;
  apt_number: number;
  city: string;
  state_province: string;
  country: string;
  zip_postal_code: string;
  label: string;
  tax: string;
}

export interface UserMeData {
  cart_id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  username: string;
  addresses: UserAddress;
  is_verified: boolean;
}
