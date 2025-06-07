import React, { useContext } from "react";
import type { IProduct } from "../types";
import UiContext from "../context/UI/UiContext";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

const ProductCard: React.FC<IProduct> = ({ id, description, image, price, rating, title }) => {
  const { isSmallerDisplay } = useContext(UiContext);

  return (
    <Link className="product-card" to={`/products/${id}`}>
      <img
        style={{
          width: "100%",
          aspectRatio: isSmallerDisplay ? "1.5" : "0.8",
          objectFit: "cover",
        }}
        src={image}
        alt={title}
      />

      <h3 className="product-title">{title}</h3>
      <div className="product-description">{description}</div>

      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <span>{rating.rate}</span>
        <Rating
          className="product-star-rating-wrapper"
          size={16}
          readonly
          allowFraction
          initialValue={rating.rate}
          disableFillHover
        />
        <span>({rating.count})</span>
      </div>

      <h2 className="product-price">₹ {price}</h2>
    </Link>
  );
};

export default ProductCard;
