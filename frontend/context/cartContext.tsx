import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from "react";

type CartContextType = {
  cartId: string;
  setCartId: (id: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [cartId, setCartId] = useState<string>("");

  useEffect(() => {
    const storedCartId = localStorage.getItem("cartId");
    if (storedCartId) {
      setCartId(storedCartId);
    }
  }, []);

  const updateCartId = (id: string) => {
    setCartId(id);
    localStorage.setItem("cartId", id);
  };

  return (
    <CartContext.Provider value={{ cartId, setCartId: updateCartId }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
