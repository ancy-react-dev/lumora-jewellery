
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../App.css";

import { initialProducts, type Product } from "../data/products";

const getProducts = (): Product[] => {
  try {
    const saved = localStorage.getItem("lumora-products");
    return saved ? (JSON.parse(saved) as Product[]) : initialProducts;
  } catch {
    return initialProducts;
  }
};

  
function NewCollection() {
    const [cart, setCart] = useState<number[]>(() => {
  try {
    return JSON.parse(localStorage.getItem("lumora-cart") || "[]");
  } catch {
    return [];
  }
});

useEffect(() => {
  localStorage.setItem("lumora-cart", JSON.stringify(cart));
}, [cart]);

const addToCart = (productId: number) => {
  const updatedCart = [
    ...JSON.parse(localStorage.getItem("lumora-cart") || "[]"),
    productId,
  ];

  localStorage.setItem("lumora-cart", JSON.stringify(updatedCart));
  setCart(updatedCart);
  alert("Product added to cart! 🛒");
};
const [products, setProducts] = useState<Product[]>(getProducts);

useEffect(() => {
  const syncProducts = () => {
    setProducts(getProducts());
  };

  window.addEventListener("focus", syncProducts);
  window.addEventListener("storage", syncProducts);

  return () => {
    window.removeEventListener("focus", syncProducts);
    window.removeEventListener("storage", syncProducts);
  };
}, []);
  const [category, setCategory] = useState("All");

  const filteredProducts =
    category === "All"
      ? products
: products.filter((product) => product.category === category);

  return (

    <div className="store">
      <header className="navbar">
        <Link className="logo" to="/">
          LUMORA<span>.</span>
        </Link>
        <Link className="collection-button" to="/">
          ← Back to Home
        </Link>
      </header>

      <main className="products">
        <p className="eyebrow">JUST ARRIVED</p>
        <h2>Our New Collection ✨</h2>
        <p>Beautiful jewellery for every moment.</p>

<div className="product-controls">
  {["All", "Necklaces", "Earrings", "Rings", "Bracelets"].map(
    (item) => (
      <button
        key={item}
        onClick={() => setCategory(item)}
      >
        {item}
      </button>
    )
  )}
</div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-art">
                <img src={product.image} alt={product.name} />
              </div>
              <p className="eyebrow">{product.category}</p>
             <Link to={`/product/${product.id}`} className="product-details-link">
  <h3>{product.name}</h3>
</Link>

<p>₹{product.price.toLocaleString("en-IN")}</p>

<Link
  to={`/product/${product.id}`}
  className="product-details-link"
>
  View Details →
</Link>
<button
  className="add-cart-button"
  onClick={() => addToCart(product.id)}
>
  Add to Cart 🛒
</button>

            </article>
          ))}
        </div>
      </main>

      <footer id="about">
        <Link className="logo" to="/">
          LUMORA<span>.</span>
        </Link>
        <p>Jewellery for every chapter of your story.</p>
        <small>© 2026 Lumora Jewellery. All rights reserved.</small>
      </footer>
    </div>
  );
}

export default NewCollection;
