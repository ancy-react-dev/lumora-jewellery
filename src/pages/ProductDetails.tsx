
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { initialProducts, type Product } from "../data/products";
import "../App.css";

const getProducts = (): Product[] => {
  try {
    const saved = localStorage.getItem("lumora-products");
    return saved ? (JSON.parse(saved) as Product[]) : initialProducts;
  } catch {
    return initialProducts;
  }
};


function ProductDetails() {
    const [products, setProducts] = useState<Product[]>(getProducts);

useEffect(() => {
  const syncProducts = () => setProducts(getProducts());

  window.addEventListener("focus", syncProducts);
  window.addEventListener("storage", syncProducts);

  return () => {
    window.removeEventListener("focus", syncProducts);
    window.removeEventListener("storage", syncProducts);
  };
}, []);
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));

  const addToCart = () => {
    if (!product) return;

    try {
      const cart: number[] = JSON.parse(
        localStorage.getItem("lumora-cart") || "[]"
      );

      localStorage.setItem(
        "lumora-cart",
        JSON.stringify([...cart, product.id])
      );

      alert("Product added to cart! 🛍️");
    } catch {
      alert("Unable to add product to cart.");
    }
  };

  if (!product) {
    return (
      <div className="categories">
        <h2>Product not found</h2>
        <Link className="primary-button" to="/new-collection">
          Back to Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="store">
      <header className="navbar">
        <Link className="logo" to="/">
          LUMORA<span>.</span>
        </Link>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/new-collection">Collections</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>

      <section className="product-details">
        <div className="product-details-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-details-info">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <h2>₹{product.price.toLocaleString("en-IN")}</h2>
          <p>Beautiful jewellery for every moment.</p>

          <button className="checkout-button" onClick={addToCart}>
            Add to Cart
          </button>

          <Link className="primary-button" to="/new-collection">
            Back to Collections
          </Link>
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;
