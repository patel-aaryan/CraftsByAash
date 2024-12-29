const featureFlags = {
  auth: process.env.NEXT_PUBLIC_AUTH === "true", // /login, /register, /reset, /verify
  shop: process.env.NEXT_PUBLIC_SHOP === "true", // /shop
  cart: process.env.NEXT_PUBLIC_CART === "true", // /cart, /checkout
  settings: process.env.NEXT_PUBLIC_ACCOUNT === "true", // /settings
};

export default featureFlags;
