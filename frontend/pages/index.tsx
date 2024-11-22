import Link from "next/link";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { CartResults } from "@/types/responses/cartResponses";
import { UserMe } from "@/types/responses/userResponses";
import { useCart } from "@/context/cartContext";

export default function Home() {
  const { data: session } = useSession();
  const token = session?.user.access;

  const { setCartId } = useCart();

  const [first, setFirst] = useState("New");
  const [last, setLast] = useState("User");

  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        try {
          const url = `${process.env.NEXT_PUBLIC_API_URL}/store/users/me/`;
          const headers = { Authorization: `JWT ${token}` };
          const response = await axios.get<UserMe>(url, { headers });
          const user: UserMe = response.data;
          setFirst(user.first_name);
          setLast(user.last_name);
        } catch (error) {
          console.error(error);
        }
      };

      const fetchCart = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/store/carts/`;
        const headers = { Authorization: `JWT ${token}` };
        const getCart = await axios.get<CartResults[]>(url, { headers });
        const cart = getCart.data;
        if (cart.length) setCartId(cart[0].cart_id);
        else await axios.post(url, {});
      };

      fetchUser();
      fetchCart();
    }
  }, [setCartId, token]);

  return (
    <div>
      Welcome, {first} {last}
      <Link href="/login">
        <Button className="mx-2 rounded-full" variant="contained">
          Log in
        </Button>
      </Link>
      <Link href="/register">
        <Button className="mx-2 rounded-full" variant="contained">
          Register
        </Button>
      </Link>
    </div>
  );
}
