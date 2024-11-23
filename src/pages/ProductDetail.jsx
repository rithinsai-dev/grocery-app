import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../CartContext";

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#4caf50",
    color: "white",
    marginBottom: "2rem",
  },
  navLink: {
    textDecoration: "none",
    color: "white",
    fontSize: "18px",
    margin: "0 1rem",
  },
  container: {
    padding: "2rem",
    textAlign: "center",
    maxWidth: "800px",
    margin: "0 auto",
  },
  imageContainer: {
    marginBottom: "2rem",
  },
  image: {
    width: "300px",
    height: "300px",
    objectFit: "cover",
    margin: "0 auto",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  fallbackImage: {
    width: "300px",
    height: "300px",
    margin: "0 auto",
    backgroundColor: "#f0f0f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  price: {
    fontSize: "20px",
    marginBottom: "1.5rem",
  },
  buttonContainer: {
    marginBottom: "1.5rem",
  },
  addButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.2s",
  },
  cartMessage: {
    color: "#4caf50",
    fontSize: "18px",
    margin: "1rem 0",
  },
  linkContainer: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    marginTop: "1rem",
  },
  link: {
    textDecoration: "none",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    display: "inline-block",
    transition: "background-color 0.2s",
  },
  cartLink: {
    backgroundColor: "#ff5722",
  },
  backLink: {
    backgroundColor: "#4caf50",
  },
  loading: {
    fontSize: "18px",
    margin: "2rem 0",
  },
};

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    setLoading(true);
    setImageError(false);
  
    fetch(`http://localhost:3001/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product");
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => {
        console.error("Error fetching product details:", err);
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);
  };

  const handleImageError = () => {
    setImageError(true);
    console.error("Image failed to load:", product?.image);
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <p style={styles.loading}>Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={styles.container}>
        <p>Product not found</p>
        <Link to="/" style={{ ...styles.link, ...styles.backLink }}>
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Navbar */}
      <div style={styles.navbar}>
        <h1>Grocery Store</h1>
        <div>
          <Link to="/" style={styles.navLink}>
            Home
          </Link>
          <Link to="/cart" style={styles.navLink}>
            Cart
          </Link>
        </div>
      </div>

      {/* Product Details */}
      <div style={styles.container}>
        <div style={styles.imageContainer}>
          {!imageError ? (
            <img
            src={product.image ? `/public/${product.image}` : '/images/placeholder.jpg'}
            alt={product.name}
            style={styles.image}
            onError={handleImageError}
          />
          ) : (
            <div style={styles.fallbackImage}>
              <p>Image not available</p>
            </div>
          )}
        </div>

        <h1 style={styles.title}>{product.name}</h1>
        <p style={styles.price}>Rs.{product.price.toFixed(2)}</p>

        <div style={styles.buttonContainer}>
          {!addedToCart ? (
            <button onClick={handleAddToCart} style={styles.addButton}>
              Add to Cart
            </button>
          ) : (
            <p style={styles.cartMessage}>Added to Cart</p>
          )}
        </div>

        <div style={styles.linkContainer}>
          <Link to="/cart" style={{ ...styles.link, ...styles.cartLink }}>
            Go to Cart
          </Link>

          <Link to="/" style={{ ...styles.link, ...styles.backLink }}>
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
