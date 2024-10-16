import ProductCard from "@/components/productCard";
import { useEffect, useState } from "react";
import { Product, ProductResults } from "@/types/responses/productResponse";

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      const data: ProductResults = await response.json();
      setProducts(data.results);
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}
