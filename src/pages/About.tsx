
import { Link } from "react-router-dom";
import "../App.css";

function About() {
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

      <section className="categories">
        <p className="eyebrow">OUR STORY</p>
        <h2>About LUMORA</h2>
        <p>
          Jewellery for every chapter of your story.
          Discover timeless designs made to celebrate
          your beauty, style and special moments.
        </p>

        <Link className="primary-button" to="/">
          Back to Home
        </Link>
      </section>
    </div>
  );
}

export default About;
