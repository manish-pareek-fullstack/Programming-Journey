import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const MyAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("myAllOrders")) || [];
    setOrders(data);
  }, []);

  if (loading) return <Loader />;

  // FILTER
  const filteredOrders = orders.filter(
    (order) =>
      order.loginUser?.toLowerCase().includes(search.toLowerCase()) ||
      order.selectedUser?.toLowerCase().includes(search.toLowerCase()),
  );

  // SORT
  let finalOrders = [...filteredOrders];
  if (sortType === "low") {
    finalOrders.sort((a, b) => a.totalBill - b.totalBill);
  } else if (sortType === "high") {
    finalOrders.sort((a, b) => b.totalBill - a.totalBill);
  }

  // EMPTY STATE — ✅ sirf ek baar, sab ke baad
  if (orders.length === 0) {
    return (
      <div className="no-data-state">
        <div className="no-data-icon">📦</div>
        <h2>No Orders Yet</h2>
        <p>Start shopping to see your orders here.</p>
        <button className="btn-back" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
    );
  }

  return (
    <div className="orders-container">
      {/* HEADER */}
      <div className="orders-header">
        <button className="btn-back" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h2>All Orders</h2>
        <div className="order-count-badge">📦 {finalOrders.length} Orders</div>
      </div>

      {/* CONTROLS */}
      <div className="controls-bar">
        <input
          placeholder="Search by user..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setSortType(e.target.value)}>
          <option value="">Sort by Bill</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>

      {/* NO SEARCH RESULT */}
      {finalOrders.length === 0 && (
        <div className="no-data-state">
          <p>No orders found for "{search}"</p>
        </div>
      )}

      {/* ORDERS LIST */}
      {finalOrders.map((order, index) => (
        <div className="order-card" key={index}>
          {/* ORDER HEADER */}
          <div className="order-card-header">
            <div className="order-user-info">
              <h3>🔐 Login: {order.loginUser}</h3>
              <p>👤 For: {order.selectedUser}</p>
              {order.orderedAt && (
                <p>🕐 {new Date(order.orderedAt).toLocaleString()}</p>
              )}
            </div>
            <span className="order-total">₹{order.totalBill?.toFixed(2)}</span>
          </div>

          {/* PRODUCTS LIST */}
          <div className="order-products">
            {order.products?.map((p) => (
              <div className="order-product-row" key={p.id}>
                {/* IMAGE */}
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  width={70}
                  height={70}
                  style={{ borderRadius: "8px", objectFit: "cover" }}
                />

                {/* DETAILS */}
                <div className="order-product-info">
                  <p className="p-name">
                    <strong>{p.title}</strong>
                  </p>
                  <p>
                    Price: ₹{p.price} · Qty: {p.quantity}
                  </p>
                  <p>Discount: {p.discountPercentage}%</p>
                  <p>Final: ₹{p.discountedTotal}</p>
                </div>

                {/* PRICE */}
                <span className="p-price">₹{p.price}</span>
              </div>
            ))}
          </div>

          {/* ORDER FOOTER TOTAL */}
          <div className="order-card-footer">
            <span>Total Items: {order.products?.length}</span>
            <span className="order-total">
              Grand Total: ₹{order.totalBill?.toFixed(2)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAllOrders;
