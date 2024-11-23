import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Banner from "../components/Banner";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the JSON server
    axios
      .get("http://localhost:3001/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product);
    // Add logic to integrate cart functionality
  };

  return (
    <div style={{ padding: "1rem" }}>
      <Banner />
      <h1>Welcome to Grocery Store</h1>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default Home;
