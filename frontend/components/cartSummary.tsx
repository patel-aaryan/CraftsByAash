import { Button, IconButton, TextField } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { CartItem } from "@/types/responses/cartResponses";

interface CartSummaryProps {
  item: CartItem;
  index: number;
  handlePatch: (index: number, id: number, quantity: number) => Promise<void>;
  handleDelete: (index: number, id: number) => Promise<void>;
}

export default function CartSummary({
  item,
  index,
  handlePatch,
  handleDelete,
}: CartSummaryProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center">
        <Link href={`/shop/${item.product.product_id}`}>
          <Image
            src="/hero.png"
            alt={item.product.name}
            objectFit="cover"
            width={96}
            height={96}
            priority
            style={{ marginRight: 16 }}
          />
        </Link>
        <div>
          <Link href={`/shop/${item.product.product_id}`}>
            <h3 className="font-bold text-lg hover:text-blue-600">
              {item.product.name}
            </h3>
          </Link>
          <p className="text-gray-500">
            Price{" "}
            <span className="font-medium">{item.product.price.toFixed(2)}</span>
          </p>
          <div className="flex items-center mt-2">
            <IconButton
              size="small"
              onClick={() => handlePatch(index, item.id, item.quantity - 1)}
            >
              <RemoveIcon />
            </IconButton>
            <TextField
              size="small"
              variant="outlined"
              value={item.quantity}
              style={{ width: 48, textAlign: "center" }}
            />
            <IconButton
              size="small"
              onClick={() => handlePatch(index, item.id, item.quantity + 1)}
            >
              <AddIcon />
            </IconButton>
            <Button
              startIcon={<DeleteIcon />}
              color="error"
              sx={{ ml: 2 }}
              onClick={() => handleDelete(index, item.id)}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>

      <div className="font-bold text-lg">{item.total.toFixed(2)}</div>
    </div>
  );
}
