import React from "react";
import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="productCard">
      <img src={product.img} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price}</p>
    </div>
  );
}

export default ProductCard;
