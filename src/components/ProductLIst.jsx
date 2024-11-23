import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch all products
  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data); // Initialize filtered products with all products
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Filter products based on search term
  const handleSearch = (searchTerm) => {
    if (searchTerm === "") {
      setFilteredProducts(products); // Show all products if search term is empty
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />

      {/* Auto-Scrolling Banners */}
      <div
        style={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          position: "relative",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            animation: "scrollBanner 10s linear infinite",
          }}
        >
          <img
            src="banner1.jpg"
            alt="Banner 1"
            style={{ width: "100%", maxWidth: "1200px" }}
          />
          <img
            src="banner2.jpg"
            alt="Banner 2"
            style={{ width: "100%", maxWidth: "1200px" }}
          />
          <img
            src="banner3.jpg"
            alt="Banner 3"
            style={{ width: "100%", maxWidth: "1200px" }}
          />
        </div>
      </div>

      {/* Product Cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Inline Styles for Animation */}
      <style>
        {`
          @keyframes scrollBanner {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default ProductList;
