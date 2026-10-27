
import { Link } from "react-router-dom";
import "../App.css";

function Categories() {
  return (
    <div className="store">
      <header className="navbar">
        <Link className="logo" to="/">LUMORA<span>.</span></Link>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/new-collection">Collections</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>

      <section className="categories">
        <p className="eyebrow">FIND YOUR FAVOURITE</p>
        <h2>Shop by category</h2>

        <div className="category-grid">
          <Link to="/new-collection" className="category-card">
            <span>♢</span>
            <h3>Necklaces</h3>
          </Link>

          <Link to="/new-collection" className="category-card">
            <span>◉</span>
            <h3>Earrings</h3>
          </Link>

          <Link to="/new-collection" className="category-card">
            <span>◇</span>
            <h3>Rings</h3>
          </Link>

          <Link to="/new-collection" className="category-card">
            <span>⌁</span>
            <h3>Bracelets</h3>
          </Link>
        </div>

        <Link className="primary-button" to="/">
          Back to Home
        </Link>
      </section>
    </div>
  );
}

export default Categories;
