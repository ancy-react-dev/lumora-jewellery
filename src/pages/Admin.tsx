
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  initialProducts,
  type Product,
} from "../data/products";

export default function Admin() {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem("lumora-products");
      return saved ? JSON.parse(saved) as Product[] : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  useEffect(() => {
    localStorage.setItem("lumora-products", JSON.stringify(products));
  }, [products]);

const [newName, setNewName] = useState("");
const [newPrice, setNewPrice] = useState("");
const [newCategory, setNewCategory] = useState("Necklaces");
const [newImage, setNewImage] = useState("");

const [editingId, setEditingId] = useState<number | null>(null);


const addProduct = () => {
  const price = Number(newPrice);

  if (!newName.trim() || !newPrice || !Number.isFinite(price) || price <= 0 || !newImage.trim()) {
    alert("Please enter a product name, valid price and image URL.");
    return;
  }

  const newProduct: Product = {
    id: Date.now(),
    name: newName.trim(),
    price,
    category: newCategory,
    image: newImage.trim(),
  };

  setProducts((current) => [...current, newProduct]);
  setNewName("");
  setNewPrice("");
  setNewCategory("Necklaces");
  setNewImage("");
};

const startEdit = (product: Product) => {
  setEditingId(product.id);
  setNewName(product.name);
  setNewPrice(String(product.price));
  setNewCategory(product.category);
  setNewImage(product.image);
};

const saveEdit = () => {
  const price = Number(newPrice);

  if (
    !newName.trim() ||
    !newPrice ||
    !Number.isFinite(price) ||
    price <= 0 ||
    !newImage.trim()
  ) {
    alert("Please enter valid product details.");
    return;
  }

  setProducts((current) =>
    current.map((product) =>
      product.id === editingId
        ? {
            ...product,
            name: newName.trim(),
            price,
            category: newCategory,
            image: newImage.trim(),
          }
        : product
    )
  );

  setEditingId(null);
  setNewName("");
  setNewPrice("");
  setNewCategory("Necklaces");
  setNewImage("");
};

  const deleteProduct = (id: number) => {
    if (!window.confirm("Delete this product?")) return;

    setProducts((current) =>
      current.filter((product) => product.id !== id)
    );
  };

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <p className="admin-label">LUMORA • ADMIN PANEL</p>
          <h1>Product Management</h1>
          <p>View and manage your jewellery products.</p>
        </div>
        <Link to="/">← Back to Store</Link>
      </header>

      <section className="admin-stats">
        <article className="admin-stat-card">
          <span>💎</span>
          <p>Total Products</p>
          <h2>{products.length}</h2>
        </article>
      </section>

<section className="admin-section">
  <h2>Add New Product ✨</h2>

  <form
  className="admin-add-form"
  onSubmit={(event) => {
    event.preventDefault();

    if (editingId !== null) {
      saveEdit();
    } else {
      addProduct();
    }
  }}
>
    <input
      type="text"
      placeholder="Product name"
      value={newName}
      onChange={(event) => setNewName(event.target.value)}
      required
    />

    <input
      type="number"
      placeholder="Price (₹)"
      min="1"
      value={newPrice}
      onChange={(event) => setNewPrice(event.target.value)}
      required
    />

    <select
      value={newCategory}
      onChange={(event) => setNewCategory(event.target.value)}
    >
      <option value="Necklaces">Necklaces</option>
      <option value="Earrings">Earrings</option>
      <option value="Rings">Rings</option>
      <option value="Bracelets">Bracelets</option>
    </select>

    <input
      type="url"
      placeholder="Product image URL (https://...)"
      value={newImage}
      onChange={(event) => setNewImage(event.target.value)}
      required
    />

    
<button
  type="submit"
  className="add-cart-button"
  onClick={(event) => {
    event.preventDefault();

    if (editingId !== null) {
      saveEdit();
    } else {
      addProduct();
    }
  }}
>
  {editingId !== null ? "Save Changes" : "+ Add Product"}
</button>

{editingId !== null && (
  <button
    type="button"
    onClick={() => {
      setEditingId(null);
      setNewName("");
      setNewPrice("");
      setNewCategory("Necklaces");
      setNewImage("");
    }}
  >
    Cancel Edit
  </button>
)}

  </form>
</section>

      <section className="admin-section">
        <h2>Products</h2>

        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <div className="admin-product-list">
            {products.map((product) => (
              <article className="admin-product-row" key={product.id}>
                <img src={product.image} alt={product.name} />
                <div className="admin-product-info">
                  <h3>{product.name}</h3>
                  <p>{product.category}</p>
                  <strong>
                    ₹{product.price.toLocaleString("en-IN")}
                  </strong>
                </div>
                
<button
  type="button"
  className="admin-edit-button"
  onClick={() => startEdit(product)}
>
  Edit
</button>

                <button
                  className="admin-delete-button"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
