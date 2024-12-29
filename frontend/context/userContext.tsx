import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { UserMeData } from "@/types/responses/userResponses";

interface UserContextType {
  firstName: string;
  lastName: string;
  cartId: string;
  email: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: session } = useSession();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [cartId, setCartId] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (session?.user?.access) {
      (async () => {
        try {
          const response = await fetch("/api/user/", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `JWT ${session.user?.access}`,
            },
          });
          const data: UserMeData = await response.json();
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setEmail(data.email);
          if (data.cart_id) setCartId(data.cart_id);
        } catch (error) {
          console.error("Failed to fetch user data", error);
        }
      })();
    }
  }, [session?.user?.access]);

  return (
    <UserContext.Provider value={{ firstName, lastName, cartId, email }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
