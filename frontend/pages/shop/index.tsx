import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";
import { Product, ProductResults } from "@/types/responses/productResponse";
import { Box, CircularProgress, Grid2 } from "@mui/material";
import featureFlags from "@/utils/featureFlags";
import ComingSoon from "@/components/ComingSoon";

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/products");
      const data: ProductResults = await response.json();
      setProducts(data.results);
      setLoading(true);
    })();
  }, []);

  if (!featureFlags.shop) return <ComingSoon />;

  return (
    <Box px={8} py={10}>
      {loading ? (
        <Grid2 container spacing={2} justifyContent={"center"}>
          {products.map((product, index) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
              <ProductCard product={product} />
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" my={8}>
          <CircularProgress size={60} />
        </Box>
      )}
    </Box>
  );
}
