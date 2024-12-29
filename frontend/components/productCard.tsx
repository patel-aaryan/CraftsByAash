import { useState } from "react";
import Link from "next/link";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { CartPost } from "@/types/payloads/cartPayload";
import { Product } from "@/types/responses/productResponse";
import { useSession } from "next-auth/react";
import { useUser } from "@/context/userContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { data: session } = useSession();
  const token = session?.user?.access;
  const { cartId } = useUser();

  const [isAdded, setIsAdded] = useState(false);

  if (!product) return <div>Loading...</div>;

  const addToCart = async (id: string) => {
    if (cartId) {
      try {
        const payload: CartPost = {
          cart: cartId,
          product_id: id,
          quantity: 1,
        };
        await fetch(`/api/cart?cartId=${cartId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
          body: JSON.stringify(payload),
        });
        setIsAdded(true);
        setTimeout(() => {
          setIsAdded(false);
        }, 3000);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    }
  };

  const buttonText = isAdded ? "Added to Cart" : "Add to Cart";
  const buttonColor: "success" | "primary" = isAdded ? "success" : "primary";

  return (
    <Card sx={{ borderRadius: "24px", mx: "auto", width: 256, p: 3 }}>
      <Link href={`/shop/${product.product_id}`}>
        <CardMedia
          component="img"
          sx={{ height: 200, objectFit: "contain" }}
          image={`/products/${product.thumbnail}.jpg`}
          alt={product.name}
        />
      </Link>
      <CardContent>
        <Link href={`/shop/${product.product_id}`}>
          <div className="hover:text-blue-600">
            <Typography variant="h5">{product.name}</Typography>
          </div>
          <Typography variant="h6" sx={{ my: 1 }}>
            ${product.price}
          </Typography>
        </Link>
        <Button
          sx={{
            borderRadius: "32px",
            bgcolor: isAdded ? "success.main" : "primary.main",
            "&.Mui-disabled": { bgcolor: "success.main", color: "white" },
          }}
          variant="contained"
          color={buttonColor}
          onClick={() => addToCart(product.product_id)}
          disabled={isAdded}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}
