import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { CartItem } from "@/types/responses/cartResponses";

interface CartSummaryProps {
  items: CartItem[];
  subtotal: number;
}

export default function CostBreakdown({ items, subtotal }: CartSummaryProps) {
  return (
    <Card sx={{ maxWidth: 400, margin: "auto", p: 2 }}>
      <CardContent>
        {/* Title */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Summary
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {/* Cost breakdown of each item */}
        {items.map((item, index) => (
          <Box key={index} display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="body1">
              {item.product.name} (x{item.quantity})
            </Typography>
            <Typography variant="body1">${item.total.toFixed(2)}</Typography>
          </Box>
        ))}

        <Divider sx={{ mt: 2, mb: 2 }} />

        {/* Subtotal */}
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="body1" fontWeight="bold">
            Subtotal
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            ${subtotal.toFixed(2)}
          </Typography>
        </Box>

        {/* Total */}
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" fontWeight="bold">
            Total
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            ${subtotal.toFixed(2)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
