import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import type { IProduct } from "../types";

const Product: React.FC = () => {
  const { id } = useParams();

  const [productData, setProductData] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);

      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);

        setProductData(await res.json());
      } catch (error) {
        console.error("Error Fetching Product data: ", error);
      } finally {
        setLoading(false);
      }
    };

    id && fetchProduct();
  }, [id]);

  return (
    <div className="page-container">
      <h2>Products Details</h2>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
        <img
          style={{
            width: "400px",
            maxWidth: "100%",
            aspectRatio: "0.8",
          }}
          src={productData?.image}
          alt={productData?.title}
        />
      </div>

      <h2 className="product-title">{productData?.title}</h2>

      <div>
        <h2 className="product-price">₹ {productData?.price}</h2>

        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span>
            <Rating readonly allowFraction showTooltip initialValue={productData?.rating.rate} disableFillHover />
          </span>
          <span>{productData?.rating.count} ratings</span>
        </div>
      </div>

      <div>
        <h3>Product Description</h3>
        <div className="product-description">{productData?.description}</div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
        {loading && <span>Loading...</span>}
      </div>
    </div>
  );
};

export default Product;
