import { Field, StateMap } from "@/types/forms";
import { ChangeEvent } from "react";

export const getBase = (label: string, value = ""): Field => ({
  label: label,
  value: value,
  touched: false,
  error: "",
});

export const handleChange =
  (stateMap: StateMap) => (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const field = stateMap[name];
    field.setState((prev) => ({
      ...prev,
      value: value,
      error: field.validate(value, true, field.state.label),
    }));
  };

export const handleBlur =
  (stateMap: StateMap) =>
  (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    const field = stateMap[name];
    field.setState((prev) => ({
      ...prev,
      touched: true,
      error: field.validate(field.state.value, true, field.state.label),
    }));
  };
