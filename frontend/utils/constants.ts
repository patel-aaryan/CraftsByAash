export const COMPANY = "CraftsByAash";
export const EMAIL = process.env.EMAIL || "someone@example.com";
export const PHONE = process.env.PHONE || "+1 (123) 456-7890";
export const ETSY = process.env.ETSY || "https://www.etsy.com/";

export const protectedRoutes = ["/cart", "/checkout", "/settings"];
export const authRoutes = ["/login", "/register", "/reset"];
