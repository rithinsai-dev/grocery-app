import React from "react";
import { useCart } from "../CartContext"; // Importing the CartContext
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import Navbar

const Cart = () => {
  const { cart, removeFromCart, updateCartItem, clearCart } = useCart(); // Accessing cart functions

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleQuantityChange = (id, event) => {
    const quantity = parseInt(event.target.value, 10);
    if (quantity > 0) {
      updateCartItem(id, quantity); // Update item quantity
    }
  };

  return (
    <div>
      {/* Add Navbar here */}
      <Navbar />

      <div style={{ padding: "1rem", textAlign: "center" }}>
        <h1>Your Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
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
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => handleQuantityChange(item.id, e)}
                    style={{
                      width: "50px",
                      padding: "0.2rem",
                      marginRight: "1rem",
                      textAlign: "center",
                    }}
                  />
                </div>
                <div>
                  <button
                    onClick={() => removeFromCart(item.id)} // Remove item from cart
                    style={{
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      padding: "0.5rem 1rem",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div style={{ marginTop: "2rem" }}>
              <button
                onClick={clearCart} // Clear all items from the cart
                style={{
                  backgroundColor: "#ff5722",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Clear Cart
              </button>
            </div>

            {/* Total Price */}
            <div style={{ marginTop: "2rem", fontSize: "18px", fontWeight: "bold" }}>
              <p>Total Price: Rs.{totalPrice.toFixed(2)}</p>
            </div>

            {/* Checkout Button */}
            <div style={{ marginTop: "2rem" }}>
              <Link
                to="/checkout" // Link to the checkout page
                style={{
                  textDecoration: "none",
                  color: "white",
                  backgroundColor: "#4caf50",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                }}
              >
                Checkout
              </Link>
            </div>
          </div>
        )}

        <div style={{ marginTop: "2rem" }}>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "white",
              backgroundColor: "#4caf50",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
            }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
