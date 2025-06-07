import type React from "react";
import { useEffect, useState } from "react";
import type { IProduct } from "../types";
import { ProductCard } from "../components";

const Home: React.FC = () => {
  const [trendingProducts, setTrendingProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const res = await fetch("https://fakestoreapi.com/products");

        setTrendingProducts(await res.json());
      } catch (error) {
        console.error("Error fetching Trending Products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="page-container">
      <h3>Trending Products</h3>

      <div className="grid-container">
        {trendingProducts.map((product) => (
          <ProductCard {...product} key={`home-page-prod-${product.id}`} />
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
        {loading && <span>Loading...</span>}
      </div>
    </div>
  );
};

export default Home;
