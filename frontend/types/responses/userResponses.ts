export interface UserMe {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface UserAddress {
  address_id: string;
  street_number: number;
  street_name: string;
  apt_number: number;
  city: string;
  state_province: string;
  country: string;
  zip_postal_code: string;
  label: string;
}
