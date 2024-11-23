import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext";

const Navbar = ({ onSearch }) => {
  const { cart } = useCart(); // Get cart from context
  const [searchTerm, setSearchTerm] = useState(""); // Local state to track the search input

  // Handle input change in search bar
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value); // Pass the search term to the parent component
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#4caf50",
        padding: "0.5rem 1rem",
        color: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 style={{ fontSize: "1.5rem", margin: 0 }}>Grocery Store</h1>
      
      {/* Search Bar */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search products..."
        style={{
          padding: "0.5rem",
          borderRadius: "4px",
          border: "none",
          width: "200px",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        <Link
          to="/"
          style={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Home
        </Link>
        {/* <Link
          to="/products"
          style={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Products
        </Link> */}
        <Link
          to="/cart"
          style={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Cart ({cart.length})
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
