import { Button, TextField } from "@mui/material";

interface OrderSummaryProps {
  subtotal: number;
}

export default function OrderSummary({ subtotal }: OrderSummaryProps) {
  return (
    <div className="w-1/4 h-3/4 bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Order Summary</h3>

      {/* Price, Discount, Shipping */}
      <div>
        <div className="flex justify-between mb-2">
          <p className="text-gray-600">Price</p>
          <p className="font-bold">{subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="text-gray-600">Discount</p>
          <p className="font-bold">-$31.90</p>
          {/* Placeholder value for discount */}
        </div>
        <div className="flex justify-between mb-2">
          <p className="text-gray-600">Coupon Applied</p>
          <p className="font-bold">$0.00</p>
        </div>
      </div>

      <hr className="my-4" />
      <div className="flex justify-between mb-4">
        <p className="text-lg font-bold">TOTAL</p>
        <p className="text-lg font-bold">{subtotal.toFixed(2)}</p>
        {/* Adjust this calculation as necessary */}
      </div>

      <div className="space-y-2">
        <TextField
          size="small"
          variant="outlined"
          placeholder="Coupon Code"
          className="w-full mb-4"
        />
        <Button variant="contained" color="primary" className="w-full">
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}
