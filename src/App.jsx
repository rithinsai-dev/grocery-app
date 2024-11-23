import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetails from "./pages/ProductDetail";
import Cart from "./pages/Cart"; // Ensure this points to your cart component
import Checkout from "./pages/Checkout"; // Checkout Page
const App = () => {
  return (
    <Router>
      {/* <div>
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1rem",
            backgroundColor: "#4caf50",
            alignItems: "center",
          }}
        >
          <Link
            to="/"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            Grocery Store
          </Link>
          <div>
            <Link
              to="/"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "1rem",
                marginRight: "1rem",
              }}
            >
              Products
            </Link>
            <Link
              to="/cart"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "1rem",
              }}
            >
              Cart
            </Link>
          </div>
        </nav> */}

        <Routes>
          <Route path="/" element={<ProductList />} />
          {/* Correct dynamic path for product details */}
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      {/* </div> */}
    </Router>
  );
};

export default App;
