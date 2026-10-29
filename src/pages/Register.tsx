
import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage(
      data.session
        ? "Account created successfully! You can now log in."
        : "Registration submitted! Check your email to confirm your account."
    );
  };

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <p>Join the LUMORA Jewellery family ✨</p>

        <label htmlFor="register-name">Full Name</label>
        <input
          id="register-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          required
        />

        <button type="submit" className="checkout-button" disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </button>

        {message && <p role="status">{message}</p>}

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <Link to="/">← Back to Home</Link>
      </form>
    </main>
  );
}
