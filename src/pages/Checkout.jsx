import React from "react";
import { useCart } from "../CartContext"; // Importing the CartContext
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import Navbar

const Checkout = () => {
  const { cart, clearCart } = useCart(); // Accessing cart functions
  const navigate = useNavigate(); // For redirecting after checkout

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    clearCart(); // Empty the cart
    navigate("/"); // Redirect to home page after checkout
  };

  return (
    <div>
      {/* Add Navbar here */}
      <Navbar />

      <div style={{ padding: "1rem", textAlign: "center" }}>
        <h1>Checkout</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty. Please add some items before checking out.</p>
        ) : (
          <div>
            {/* List cart items */}
            <div>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "1rem",
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      marginRight: "1rem",
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h2>{item.name}</h2>
                    <p>Rs.{item.price.toFixed(2)}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>
                      Subtotal: Rs.{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Price */}
            <div style={{ marginTop: "2rem", fontSize: "18px", fontWeight: "bold" }}>
              <p>Total Price: Rs.{totalPrice.toFixed(2)}</p>
            </div>

            {/* Checkout Button */}
            <div style={{ marginTop: "2rem" }}>
              <button
                onClick={handleCheckout} // Empty the cart on checkout
                style={{
                  backgroundColor: "#4caf50",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Confirm Checkout
              </button>
            </div>
          </div>
        )}

        {/* Back to Cart Button */}
        <div style={{ marginTop: "2rem" }}>
          <Link
            to="/cart"
            style={{
              textDecoration: "none",
              color: "white",
              backgroundColor: "#ff5722",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
            }}
          >
            Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
