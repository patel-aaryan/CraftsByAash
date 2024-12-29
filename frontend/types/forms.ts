import { Dispatch, SetStateAction } from "react";

export interface AddressDetails {
  full_name: string | undefined;
  street_number: number | undefined;
  street_name: string | undefined;
  apt_number: number | undefined;
  city: string | undefined;
  state_province: string | undefined;
  country: string | undefined;
  zip_postal_code: string | undefined;
}

export interface Field {
  label: string;
  value: string;
  touched: boolean;
  error: string;
}

export interface StateMap {
  [key: string]: {
    state: Field;
    setState: Dispatch<SetStateAction<Field>>;
    validate: (value: string, touched: boolean, field?: string) => string;
  };
}

export interface Footer {
  text: string;
  link: string;
  linkText: string;
}
