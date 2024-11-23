import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create Cart Context
const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const baseURL = "http://localhost:3001/cart"; // Ensure this points to your fake DB URL

  // Fetch all cart items on load
  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => setCart(response.data))
      .catch((error) => console.error("Error fetching cart data:", error));
  }, []);

  // Add to Cart functionality
  const addToCart = async (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
      await axios.put(`${baseURL}/${existingItem.id}`, updatedItem);
      setCart((prev) =>
        prev.map((item) => (item.id === existingItem.id ? updatedItem : item))
      );
    } else {
      const newItem = { ...product, quantity: 1 };
      const response = await axios.post(baseURL, newItem);
      setCart((prev) => [...prev, response.data]);
    }
  };

  // Remove from cart functionality
  const removeFromCart = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`);
      setCart((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Update cart item functionality
  const updateCartItem = async (id, quantity) => {
    const updatedItem = { ...cart.find((item) => item.id === id), quantity };
    await axios.put(`${baseURL}/${id}`, updatedItem);
    setCart((prev) =>
      prev.map((item) => (item.id === id ? updatedItem : item))
    );
  };

  // Clear cart functionality
  const clearCart = async () => {
    try {
      await Promise.all(cart.map((item) => axios.delete(`${baseURL}/${item.id}`)));
      setCart([]);
    } catch (error) {
      console.error("Error clearing the cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateCartItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
