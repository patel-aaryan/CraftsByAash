import Link from "next/link";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";

interface Props {
  subtotal: number;
  taxes: number;
  isDisabled: boolean;
}

export default function OrderSummary({ subtotal, taxes, isDisabled }: Props) {
  const [loading, setLoading] = useState(false);
  const handleClick = () => setLoading(true);

  return (
    <>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Order Summary
      </Typography>

      {/* Price, Discount, Shipping */}
      <Box>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography color="text.secondary">Subtotal</Typography>
          <Typography fontWeight="bold">${subtotal.toFixed(2)}</Typography>
        </Box>

        {/* <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography color="text.secondary">Order Discounts</Typography>
          <Typography fontWeight="bold">${subtotal.toFixed(2)}</Typography>
        </Box> */}

        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography color="text.secondary">Estimated Taxes</Typography>
          <Typography fontWeight="bold">${taxes.toFixed(2)}</Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Total */}
      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography variant="subtitle1" fontWeight="bold">
          TOTAL
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold">
          ${(subtotal + taxes).toFixed(2)}
        </Typography>
      </Box>

      {/* Coupon and Checkout */}
      <Box display="flex" flexDirection="column" gap={2}>
        {/* <TextField
          size="small"
          variant="outlined"
          placeholder="Coupon Code"
          fullWidth
        /> */}
        {!isDisabled ? (
          <Link href="/checkout" passHref>
            <LoadingButton
              loading={loading}
              onClick={handleClick}
              variant="contained"
              color="primary"
              fullWidth
            >
              Proceed to Checkout
            </LoadingButton>
          </Link>
        ) : (
          <Button variant="contained" color="primary" fullWidth disabled>
            Proceed to Checkout
          </Button>
        )}
      </Box>
    </>
  );
}
