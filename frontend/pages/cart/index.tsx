import { CartItem, CartResults } from "@/types/responses/cartResponses";
import { useEffect, useState } from "react";
import { CartPatch } from "@/types/payloads/cartPayload";
import { useSession } from "next-auth/react";
import OrderSummary from "@/components/OrderSummary";
import CartSummary from "@/components/CartSummary";
import { useUser } from "@/context/userContext";
import { Box, CircularProgress, Typography } from "@mui/material";
import featureFlags from "@/utils/featureFlags";
import { ComingSoon } from "@/components/ComingSoon";

export default function Cart() {
  const { data: session } = useSession();
  const token = session?.user?.access;
  const { cartId } = useUser();

  const [items, setItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [cartIsEmpty, setCartIsEmpty] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (token) {
        const getCart = await fetch("/api/cart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        });
        const cart: CartResults[] = await getCart.json();
        if (cart.length) {
          setItems(cart[0].items);
          setSubtotal(cart[0].subtotal);
          setTaxes(cart[0].subtotal * 0.13);
          setLoading(true);
        }
      }
    })();
  }, [token]);

  useEffect(() => {
    if (items.length) setCartIsEmpty(false);
  }, [items]);

  const handlePatch = async (index: number, id: number, quantity: number) => {
    if (quantity < 1) return;

    try {
      const payload: CartPatch = { quantity: quantity };
      await fetch(`/api/cart?cartId=${cartId}&id=${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify(payload),
      });

      setItems((prev) => {
        const updated = [...prev];
        let newSubtotal = subtotal - updated[index].total;
        updated[index].quantity = quantity;
        updated[index].total =
          updated[index].quantity * updated[index].product.price;
        newSubtotal += updated[index].total;
        setSubtotal(newSubtotal);
        setTaxes(newSubtotal * 0.13);
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
          setTaxes(newSubtotal * 0.13);
          if (!updated.length) setCartIsEmpty(true);
          return updated;
        });
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    }
  };

  if (!featureFlags.cart) return <ComingSoon />;

  return (
    <Box display="flex" justifyContent="space-between" p={4} my={8}>
      <Box width="66%" bgcolor="white" borderRadius={2} boxShadow={3} p={4}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Cart{" "}
          <Typography
            variant="body2"
            sx={{ color: "gray", display: "inline-block", px: 1 }}
          >
            {items.length} ITEMS
          </Typography>
        </Typography>

        {loading ? (
          items.map((item, index) => (
            <Box
              key={item.id}
              borderBottom="1px solid"
              borderColor="divider"
              pb={2}
              mb={2}
            >
              <CartSummary
                item={item}
                index={index}
                handlePatch={handlePatch}
                handleDelete={handleDelete}
              />
            </Box>
          ))
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            my={8}
          >
            <CircularProgress size={60} />
          </Box>
        )}
      </Box>

      {/* Right section for Order Summary */}
      <Box
        width="25%"
        height="100%"
        bgcolor="white"
        p={3}
        borderRadius={2}
        boxShadow={3}
        my={2}
        ml={8}
      >
        {loading ? (
          <OrderSummary
            subtotal={subtotal}
            taxes={taxes}
            isDisabled={cartIsEmpty}
          />
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Box>
  );
}
