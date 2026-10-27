
import { Link } from "react-router-dom";

type Order = {
  orderNumber: string;
  date: string;
  items: string[];
  total: number;
  status: string;
};

const demoOrders: Order[] = [
  {
    orderNumber: "LUM-102458",
    date: "27 Oct 2026",
    items: ["Golden Grace Necklace", "Celeste Drop Earrings"],
    total: 2398,
    status: "Processing",
  },
];

export default function MyOrders() {
  return (
    <main className="orders-page">
      <h1>My Orders</h1>
      <p>View your LUMORA order details.</p>

      {demoOrders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        demoOrders.map((order) => (
          <article className="order-card" key={order.orderNumber}>
            <h2>Order #{order.orderNumber}</h2>
            <p>Date: {order.date}</p>
            <p>Items: {order.items.join(", ")}</p>
            <h3>Total: ₹{order.total.toLocaleString("en-IN")}</h3>
            <p>Status: <strong>{order.status}</strong></p>
          </article>
        ))
      )}

      <Link to="/">← Continue Shopping</Link>
    </main>
  );
}
