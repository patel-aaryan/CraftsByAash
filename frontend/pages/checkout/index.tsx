import { FormEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Box, Button } from "@mui/material";
import { UserAddress } from "@/types/responses/userResponses";
import { useUser } from "@/context/userContext";
import ExpandablePanel from "@/components/ExpandablePanel";
import { CartItem, CartResults } from "@/types/responses/cartResponses";
import CostBreakdown from "@/components/CostBreakdown";
import featureFlags from "@/utils/featureFlags";
import { ComingSoon } from "@/components/ComingSoon";

export default function Checkout() {
  const { data: session } = useSession();
  const token = session?.user?.access;
  const { cartId, email } = useUser();

  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [shippingAddress, setShippingAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [items, setItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [refreshAddresses, setRefreshAddresses] = useState(0);
  // const [tax, setTax] = useState("")

  const handleRefresh = () => setRefreshAddresses((prev) => prev + 1);

  useEffect(() => {
    if (token) {
      (async () => {
        const response = await fetch("/api/address", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        });
        const data: UserAddress[] = await response.json();
        setAddresses(data);
      })();
    }
  }, [token, refreshAddresses]);

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
        }
      }
    })();
  }, [token]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    (async () => {
      if (token) {
        const payload = {
          cart_id: cartId,
          shipping_address: shippingAddress,
          billing_address: billingAddress,
        };
        const response = await fetch(`/api/orders?email=${email}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        console.log(data);
      }
    })();
  };

  if (!featureFlags.cart) return <ComingSoon />;

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      width="100%"
      mx="auto"
      my={12}
    >
      {/* Address Details */}
      <Box sx={{ flex: 2, mx: 2, my: 4 }}>
        <ExpandablePanel
          label="Shipping Address"
          addressList={addresses}
          address={shippingAddress}
          setAddress={setShippingAddress}
          isExpanded={true}
          handleRefresh={handleRefresh}
        />

        <ExpandablePanel
          label="Billing Address"
          addressList={addresses}
          address={billingAddress}
          setAddress={setBillingAddress}
          isExpanded={false}
          handleRefresh={handleRefresh}
        />

        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={billingAddress === "" || shippingAddress === ""}
        >
          Continue
        </Button>
      </Box>

      {/* Cost Breakdown */}
      <Box sx={{ flex: 1, mx: 2, my: 4 }}>
        <CostBreakdown items={items} subtotal={subtotal} />
      </Box>
    </Box>
  );
}
