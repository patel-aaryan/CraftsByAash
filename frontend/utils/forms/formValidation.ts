export function validateRequired(
  value: string,
  touched: boolean,
  field?: string,
) {
  return touched && !value ? `${field} is required` : "";
}

export function validateEmail(value: string, touched: boolean) {
  switch (true) {
    case !touched:
      return "";
    case !value:
      return "Email is required";
    case !/\S+@\S+\.\S+/.test(value):
      return "Enter a valid email";
    default:
      return "";
  }
}

export function validateUsername(value: string, touched: boolean) {
  switch (true) {
    case !touched:
      return "";
    case !value:
      return "Username is required";
    case value.length < 4:
      return "Username should be at least 4 characters";
    case /\s/.test(value):
      return "Username should not contain spaces";
    default:
      return "";
  }
}

export function validatePassword(value: string, touched: boolean) {
  switch (true) {
    case !touched:
      return "";
    case !value:
      return "Password is required";
    case value.length < 6:
      return "Password should be at least 6 characters";
    default:
      return "";
  }
}
