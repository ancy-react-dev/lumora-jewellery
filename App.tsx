
import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import NewCollection from "./pages/NewCollection";
import Categories from "./pages/Categories";
import About from "./pages/About";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyOrders from "./pages/MyOrders";
import Admin from "./pages/Admin";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
const [category, setCategory] = useState("All");
const [sort, setSort] = useState("default");
const [cart, setCart] = useState<number[]>(() => {
  try {
    return JSON.parse(localStorage.getItem("lumora-cart") || "[]");
  } catch {
    return [];
  }
});

const [wishlist, setWishlist] = useState<number[]>(() => {
  try {
    return JSON.parse(localStorage.getItem("lumora-wishlist") || "[]");
  } catch {
    return [];
  }
});
const [showWishlist, setShowWishlist] = useState(false);
const [showCheckout, setShowCheckout] = useState(false);
const [customerName, setCustomerName] = useState("");
const [phone, setPhone] = useState("");
const [address, setAddress] = useState("");

const [orderNumber, setOrderNumber] = useState("");
const [orderPlaced, setOrderPlaced] = useState(false);

const addToCart = (productId: number) => {
  setCart((previousCart) => [...previousCart, productId]);
  setShowCart(true);
};


const toggleWishlist = (productId: number) => {
  setWishlist((previous) =>
    previous.includes(productId)
      ? previous.filter((id) => id !== productId)
      : [...previous, productId]
  );
};
const removeFromCart = (indexToRemove: number) => {
  setCart((previousCart) =>
    previousCart.filter((_, index) => index !== indexToRemove)
  );
};

const products = [
  {
    id: 1,
    name: "Golden Grace Necklace",
    price: 1499,
    category: "Necklaces",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600",
  },
  {
    id: 2,
    name: "Celeste Drop Earrings",
    price: 899,
    category: "Earrings",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600",
  },
  {
    id: 3,
    name: "Evermore Ring",
    price: 1199,
    category: "Rings",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600",
  },
  {
    id: 4,
    name: "Royal Pearl Necklace",
    price: 1899,
    category: "Necklaces",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600",
  },
  {
    id: 5,
    name: "Golden Bloom Earrings",
    price: 999,
    category: "Earrings",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600",
  },
  {
    id: 6,
    name: "Elegant Shine Ring",
    price: 1299,
    category: "Rings",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600",
  },
];


const filteredProducts = products
  .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
  .filter((p) => category === "All" || p.category === category)
  .sort((a, b) => {
    if (sort === "low") return a.price - b.price;
    if (sort === "high") return b.price - a.price;
    return a.id - b.id;
  });
 

const [showCart, setShowCart] = useState(false);
useEffect(() => {
  localStorage.setItem("lumora-cart", JSON.stringify(cart));
}, [cart]);

useEffect(() => {
  localStorage.setItem("lumora-wishlist", JSON.stringify(wishlist));
}, [wishlist]);
return (
  <Routes>
    <Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/my-orders" element={<MyOrders />} />
<Route path="/admin" element={<Admin />} />
    <Route path="/categories" element={<Categories />} />
    <Route path="/about" element={<About />} />
    <Route
  path="/product/:id"
  element={<ProductDetails />}
/>
    <Route path="/new-collection" element={<NewCollection />} />
    
    <Route path="*" element={
      <div className="store">
    <div className="announcement">
        ✨ Timeless Elegance | Special pieces, made for you ✨
      </div>

      <header className="navbar">
        <a className="logo" href="#">LUMORA<span>.</span></a>

        
<nav>
  <Link to="/">Home</Link>
  <Link to="/categories">Categories</Link>
  <Link to="/new-collection">Collections</Link>
  <Link to="/about">About</Link>
  <Link to="/login">Login</Link>
  <Link to="/register">Register</Link>
  <Link to="/admin">Admin Dashboard</Link>
</nav>


        <button
  className="cart-button"
  onClick={() => setShowWishlist(!showWishlist)}
>
  ♡ Wishlist ({wishlist.length})
</button>
<button
  className="cart-button"
  onClick={() => setShowCart(!showCart)}
>
  🛍 Cart ({cart.length})
</button>
      </header>

{showWishlist && (
  <section className="cart-panel">
    <h2>My Wishlist ♡</h2>

    {wishlist.length === 0 ? (
      <p>Your wishlist is empty.</p>
    ) : (
      wishlist.map((id) => {
        const product = products.find((p) => p.id === id);

        if (!product) return null;

        return (
          <div className="cart-item" key={id}>
           <span>{product.name}</span>
            <span>₹{product.price.toLocaleString("en-IN")}</span>
            <button onClick={() => toggleWishlist(id)}>
              Remove
            </button>
          </div>
        );
      })
    )}
  </section>
)}

{showCart && (
  <section className="cart-panel">
    <h2>Your Shopping Cart</h2>

   
{cart.length === 0 ? (
  <p>Your cart is empty.</p>
) : (
  [...new Set(cart)].map((productId) => {
    const product = products.find((p) => p.id === productId);
    const quantity = cart.filter((id) => id === productId).length;

    if (!product) return null;

    return (
      <div className="cart-item" key={productId}>
        <span>{product.name}</span>
        <span>₹{product.price.toLocaleString("en-IN")}</span>

        <div className="quantity-controls">
          <button
            onClick={() => removeFromCart(cart.lastIndexOf(productId))}
            aria-label={`Decrease ${product.name} quantity`}
          >
            −
          </button>

          <span>{quantity}</span>

          <button
            onClick={() => addToCart(productId)}
            aria-label={`Increase ${product.name} quantity`}
          >
            +
          </button>
        </div>

        <button onClick={() => {
          setCart((previousCart) =>
            previousCart.filter((id) => id !== productId)
          );
        }}>
          Remove
        </button>
      </div>
    );
  })
)}


    
<div className="cart-summary">
  <p>
    Total Items: <strong>{cart.length}</strong>
  </p>

  <h3>
    Subtotal: ₹
    {cart.reduce((total, productId) => {
      const product = products.find((p) => p.id === productId);
      return total + (product?.price ?? 0);
    }, 0).toLocaleString("en-IN")}
  </h3>

  <p className="cart-note">
    Delivery charges, if any, will be confirmed at checkout.
  </p>
</div>

    {cart.length > 0 && (
      <button
        className="checkout-button"
        onClick={() => setShowCheckout(true)}
      >
        Proceed to Checkout →
      </button>
    )}

    {showCheckout && (
     
<form
  className="checkout-form"
  onSubmit={(e) => {
    e.preventDefault();

    const newOrderNumber = `LUM-${Date.now().toString().slice(-6)}`;

    setOrderNumber(newOrderNumber);
    setOrderPlaced(true);

    setCustomerName("");
    setPhone("");
    setAddress("");
    setShowCheckout(false);
    setCart([]);
  }}
>

        <h2>Checkout Details</h2>

        <label htmlFor="customerName">Full Name</label>
        <input
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />

        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          pattern="[0-9]{10}"
          required
        />

        <label htmlFor="address">Delivery Address</label>
        <textarea
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          rows={4}
        />

        <button type="submit" className="checkout-button">
          Place Demo Order
        </button>
      </form>
    )}  
{orderPlaced && (
  <div className="order-success">
    <h2>🎉 Order Placed Successfully!</h2>
    <p>Thank you for shopping with LUMORA.</p>
    <p>Your Order Number:</p>
    <h3>{orderNumber}</h3>

    <button
      className="checkout-button"
      onClick={() => setOrderPlaced(false)}
    >
      Continue Shopping
    </button>
  </div>
)}
  </section>
)}

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">THE ART OF EVERYDAY LUXURY</p>
            <h1>Jewellery that tells <em>your story.</em></h1>
            <p className="hero-text">
              Discover beautiful pieces designed to celebrate
              your moments, your style and your individuality.
            </p>
           <Link className="primary-button" to="/new-collection">
  Explore Collection ↗
</Link>
          </div>
          <div className="hero-art">
            <div className="hero-circle">
              <span>✧</span>
              <div className="ring">◯</div>
              <p>MADE TO SHINE</p>
            </div>
          </div>
        </section>
<section className="new-collection-banner">
      <p className="collection-eyebrow">JUST ARRIVED</p>
      <h1>NEW COLLECTION</h1>
      <p>Discover jewellery that makes every moment special.</p>
      <Link to="/new-collection" className="collection-button">
  Explore Collection
</Link>
    </section>
        <section className="categories" id="categories">
          <p className="eyebrow">FIND YOUR FAVOURITE</p>
          <h2>Shop by category</h2>
          <div className="category-grid">
            <a href="#products" className="category-card">
              <span>♢</span><h3>Necklaces</h3>
            </a>
            <a href="#products" className="category-card">
              <span>◉</span><h3>Earrings</h3>
            </a>
            <a href="#products" className="category-card">
              <span>◇</span><h3>Rings</h3>
            </a>
            <a href="#products" className="category-card">
              <span>⌁</span><h3>Bracelets</h3>
            </a>
          </div>
        </section>

        <section className="products" id="products">
          <p className="eyebrow">CURATED FOR YOU</p>
          <h2>Featured collection</h2>
          <p>Little details. Lasting impressions.</p>
          <div className="new-collection-heading">
  <p className="eyebrow">FRESHLY ARRIVED</p>
  <h2>Our New Collection ✨</h2>
  <p>Discover your next favourite piece.</p>
</div>
          <div className="product-controls">
  <input
    type="search"
    placeholder="Search jewellery..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <select value={category} onChange={(e) => setCategory(e.target.value)}>
    <option value="All">All Categories</option>
    <option value="Necklaces">Necklaces</option>
    <option value="Earrings">Earrings</option>
    <option value="Rings">Rings</option>
  </select>

  <select value={sort} onChange={(e) => setSort(e.target.value)}>
    <option value="default">Default order</option>
    <option value="low">Price: Low to High</option>
    <option value="high">Price: High to Low</option>
  </select>
</div>
         
<div className="product-grid">
  {filteredProducts.map((product) => (
    <article className="product-card" key={product.id}>
      <div className="product-art">
        <img src={product.image} alt={product.name} />
      </div>
      <h3>{product.name}</h3>
      <p>₹{product.price.toLocaleString("en-IN")}</p>
    <button onClick={() => addToCart(product.id)}>
  Add to Cart
</button> 
<button onClick={() => toggleWishlist(product.id)}>
  {wishlist.includes(product.id)
    ? "♥ Saved"
    : "♡ Add to Wishlist"}
</button>

    </article>
  ))}
</div>

{filteredProducts.length === 0 && (
  <p>No products found.</p>
)}

        </section>
      </main>

      <footer id="about">
        <a className="logo" href="#home">LUMORA<span>.</span></a>
        <p>Jewellery for every chapter of your story.</p>
        <small>© 2026 Lumora Jewellery. All rights reserved.</small>
          </footer>
      </div>
    } />
  </Routes>
  );
}

export default App;


