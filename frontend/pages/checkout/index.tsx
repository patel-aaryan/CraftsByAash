import { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Container,
  Typography,
  Paper,
  Autocomplete,
  TextField,
  Box,
  Button,
} from "@mui/material";
import { UserAddress } from "@/types/responses/userResponses";

export default function Checkout() {
  const { data: session } = useSession();
  const token = session?.user.access;

  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [shippingAddress, setShippingAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");

  useEffect(() => {
    (async () => {
      if (token) {
        const response = await fetch("/api/address", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        });
        const data: UserAddress[] = await response.json();
        setAddresses(data);
      }
    })();
  }, [token]);

  const handleShippingAddressChange = (
    event: SyntheticEvent,
    newValue: UserAddress | null
  ) => {
    if (newValue) setShippingAddress(newValue.address_id);
  };

  const handleBillingAddressChange = (
    event: SyntheticEvent,
    newValue: UserAddress | null
  ) => {
    if (newValue) setBillingAddress(newValue.address_id);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log({ shippingAddress, billingAddress });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Checkout
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            maxWidth: 500,
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: 3,
            borderRadius: 1,
          }}
        >
          <Autocomplete
            options={addresses}
            getOptionLabel={(option) => option.label}
            onChange={handleShippingAddressChange}
            value={addresses.find((addr) => addr.address_id === billingAddress)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Shipping Address"
                variant="filled"
              />
            )}
            fullWidth
          />
          <Autocomplete
            options={addresses}
            getOptionLabel={(option) => option.label}
            onChange={handleBillingAddressChange}
            value={addresses.find((addr) => addr.address_id === billingAddress)}
            renderInput={(params) => (
              <TextField {...params} label="Billing Address" variant="filled" />
            )}
            fullWidth
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Next
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
