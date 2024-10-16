import { CartItem, CartResults } from "@/types/responses/cartResponses";
import { useEffect, useState } from "react";
import { CartPatch } from "@/types/payloads/cartPayload";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useCart } from "@/context/cartContext";
import OrderSummary from "@/components/orderSummary";
import CartSummary from "@/components/cartSummary";

export default function Cart() {
  const { data: session } = useSession();
  const token = session?.user.access;

  const { cartId, setCartId } = useCart();

  const [items, setItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    (async () => {
      if (token) {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/store/carts/`;
        const headers = { Authorization: `JWT ${token}` };
        const getCart = await axios.get<CartResults[]>(url, { headers });
        const cart = getCart.data;
        if (cart.length) {
          setCartId(cart[0].cart_id);
          setItems(cart[0].items);
          setSubtotal(cart[0].subtotal);
        }
      }
    })();
  }, [setCartId, token]);

  const handlePatch = async (index: number, id: number, quantity: number) => {
    if (quantity < 1) return;

    try {
      const payload: CartPatch = { quantity: quantity };
      const response = await fetch(`/api/cart?cartId=${cartId}&id=${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data: CartPatch = await response.json();

      setItems((prev) => {
        const updated = [...prev];
        let newSubtotal = subtotal - updated[index].total;
        updated[index].quantity = data.quantity;
        updated[index].total =
          updated[index].quantity * updated[index].product.price;
        newSubtotal += updated[index].total;
        setSubtotal(newSubtotal);
        return updated;
      });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const handleDelete = async (index: number, id: number) => {
    if (token) {
      try {
        await fetch(`/api/cart?cartId=${cartId}&id=${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        });

        setItems((prev) => {
          const updated = prev.filter((_, i) => i !== index);
          const newSubtotal = subtotal - prev[index].total;
          setSubtotal(newSubtotal);
          return updated;
        });
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    }
  };

  return (
    <div className="flex justify-between p-8">
      <div className="w-2/3">
        <h2 className="text-2xl font-bold mb-4">
          Cart{" "}
          <span className="text-gray-500 text-base px-2">
            {items.length} ITEMS
          </span>
        </h2>

        {items.map((item, index) => (
          <div key={item.id} className="border-b pb-4 mb-4">
            <CartSummary
              item={item}
              index={index}
              handlePatch={handlePatch}
              handleDelete={handleDelete}
            />
          </div>
        ))}
      </div>

      <OrderSummary subtotal={subtotal} />
    </div>
  );
}
