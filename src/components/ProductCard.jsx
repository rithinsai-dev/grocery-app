import React, { useState } from "react";
import { useCart } from "../CartContext"; // Assuming CartContext is being used
import { Link } from "react-router-dom"; // For linking to product details page

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  // Handle add to cart button click
  const handleAddToCart = () => {
    addToCart(product); // Add product to cart
    setAddedToCart(true); // Show the "Added to Cart" message
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "1rem",
        margin: "1rem",
        width: "200px",
        textAlign: "center",
        borderRadius: "8px", // Rounded corners
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for better visuals
        transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth zoom and shadow effect
        overflow: "hidden", // Prevent content overflow during zoom
      }}
      className="product-card"
    >
      <Link
        to={`/product/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
        <h3>{product.name}</h3>
        <p>Rs.{product.price.toFixed(2)}</p>
      </Link>

      {!addedToCart ? (
        <button
          onClick={handleAddToCart}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            width: "100%",
            marginTop: "1rem",
          }}
        >
          Add to Cart
        </button>
      ) : (
        <p style={{ color: "green", fontSize: "1rem", marginTop: "1rem" }}>
          Added to Cart
        </p>
      )}
    </div>
  );
};

export default ProductCard;
