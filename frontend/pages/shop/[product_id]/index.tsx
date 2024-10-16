import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, IconButton, Rating } from "@mui/material";
import { Product } from "@/types/responses/productResponse";
import {
  Add,
  ArrowBack,
  ArrowBackIosNew,
  ArrowForward,
  Facebook,
  Instagram,
  Remove,
} from "@mui/icons-material";
import { CartPost } from "@/types/payloads/cartPayload";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/cartContext";

export default function ProductDetail() {
  const { data: session } = useSession();
  const token = session?.user.access;
  const { cartId } = useCart();
  const router = useRouter();
  const { product_id } = router.query as { product_id: string };

  const [isAdded, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product>({
    product_id: "",
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    colour: "",
    shape: "",
    width: 0,
    height: 0,
    photo_id: 0,
  });

  const images = [
    "/product.png",
    "/image1.jpeg",
    "/image2.jpeg",
    "/image3.jpeg",
  ];

  useEffect(() => {
    (async () => {
      if (product_id && typeof product_id === "string") {
        try {
          const response = await fetch(`/api/products/${product_id}`);
          const data: Product = await response.json();
          setProduct(data);
        } catch (error) {
          console.error("Error fetching products", error);
        }
      }
    })();
  }, [product_id]);

  const addToCart = async (quantity: number) => {
    try {
      const payload: CartPost = {
        cart: cartId,
        product_id: product_id,
        quantity: quantity,
      };
      await fetch(`/api/cart?cartId=${cartId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify(payload),
      });
      setAdded(true);
      setTimeout(() => {
        setAdded(false);
      }, 3000);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  useEffect(() => {
    if (isAdded) {
      const timer = setTimeout(() => {
        setAdded(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isAdded]);

  const buttonText = isAdded ? "Added to Cart" : "Add to Cart";
  const buttonColor: "success" | "primary" = isAdded ? "success" : "primary";

  const [imageIndex, setImageIndex] = useState(0);

  const handleNextImage = () => {
    setImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrevImage = () => {
    setImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="flex flex-col items-center p-4">
      {/* Breadcrumb */}
      <div className="w-full my-4 text-gray-500">
        <IconButton onClick={() => router.back()}>
          <ArrowBackIosNew fontSize="small" />
        </IconButton>
        product.category / {product.name}
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row-reverse gap-8 mt-4">
        {/* Image Gallery */}
        <div className="flex-1 flex flex-col items-center">
          <div className="relative">
            <Image
              src={images[imageIndex]}
              alt={product.name}
              width={192}
              height={192}
              className="w-full max-w-m max-h-48 object-contain d h-auto rounded-lg shadow-lg"
            />
            <div className="absolute top-1/2 -left-6 transform -translate-y-1/2">
              <IconButton
                color="primary"
                size="large"
                onClick={handlePrevImage}
              >
                <ArrowBack />
              </IconButton>
            </div>
            <div className="absolute top-1/2 -right-6 transform -translate-y-1/2">
              <IconButton
                color="primary"
                size="large"
                onClick={handleNextImage}
              >
                <ArrowForward />
              </IconButton>
            </div>
          </div>
          <div className="flex space-x-2 mt-4">
            {images.map((image, index) => (
              <Image
                key={index}
                src={image}
                width={80}
                height={80}
                alt={`Thumbnail ${index + 1}`}
                className="object-cover w-20 h-20 rounded-lg cursor-pointer
                border-2 border-transparent hover:border-blue-500"
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 max-w-md mx-auto lg:mx-0">
          <h1 className="text-4xl font-semibold mb-4">{product.name}</h1>
          <div className="text-2xl text-gray-800 mb-4">${product.price}</div>
          <div className="flex items-center space-x-2 mb-4">
            <Rating value={3} precision={0.5} readOnly />
            <span className="text-gray-500">
              product.rating / 5.0 (product.numRatings)
            </span>
          </div>
          <p className="text-gray-600 mb-4">{product.description}</p>

          {/* Color Options */}
          <div className="flex space-x-2 mb-4">
            <span
              key={1}
              className="w-8 h-8 rounded-full border"
              style={{ backgroundColor: product.colour }}
            ></span>
            {/* {product.colors.map((color, index) => (
            ))} */}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4 mb-4">
            <IconButton
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            >
              <Remove />
            </IconButton>
            <input
              type="number"
              min="1"
              value={quantity}
              className="w-12 text-center border rounded-md p-1"
            />
            <IconButton onClick={() => setQuantity(quantity + 1)}>
              <Add />
            </IconButton>
          </div>

          {/* Add to Cart Button */}
          <Button
            sx={{
              bgcolor: isAdded ? "success.main" : "primary.main",
              "&.Mui-disabled": {
                bgcolor: "success.main",
                color: "white",
              },
            }}
            variant="contained"
            color={buttonColor}
            fullWidth
            className="mb-4"
            onClick={() => addToCart(quantity)}
            disabled={isAdded}
          >
            {buttonText}
          </Button>

          {/* Product Information */}
          <div className="text-gray-500 space-y-1 mb-4">
            <p>Free 3-5 day shipping</p>
            <p>Tool-free assembly</p>
            <p>30-day trial</p>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center space-x-4 mt-6">
            <IconButton color="primary">
              <Facebook />
            </IconButton>
            <IconButton color="primary">
              <Instagram />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}
