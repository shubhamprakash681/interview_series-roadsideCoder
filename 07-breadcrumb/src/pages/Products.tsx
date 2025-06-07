import React, { useEffect, useState } from "react";
import { ProductCard } from "../components";
import type { IProduct } from "../types";

const Products: React.FC = () => {
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const res = await fetch("https://fakestoreapi.com/products");

        setAllProducts(await res.json());
      } catch (error) {
        console.error("Error Fetching Products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="page-container">
      <h3>All Products</h3>

      <div className="grid-container">
        {allProducts.map((product) => (
          <ProductCard {...product} key={`home-page-prod-${product.id}`} />
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
        {loading && <span>Loading...</span>}
      </div>
    </div>
  );
};

export default Products;
