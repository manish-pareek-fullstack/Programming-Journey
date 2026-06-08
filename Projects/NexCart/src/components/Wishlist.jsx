import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Wishlist.css";
import { toast } from "react-toastify";
const Wishlist = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setData(wishlist);
  }, []);

  const filterdata = data.filter(
    (item) =>
      item.loginUser?.toLowerCase().includes(search.toLowerCase()) ||
      item.selectedUser?.toLowerCase().includes(search.toLowerCase()) ||
      item.product?.title?.toLowerCase().includes(search.toLowerCase()),
  );

  const totalAmount = data.reduce(
    (acc, item) => acc + (item.product.price || 0),
    0,
  );

  const handleDelete = (index) => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    const updated = stored.filter((_, i) => i !== index);

    setData(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };
  const handleOrderAll = () => {
    const existingOrders =
      JSON.parse(localStorage.getItem("myAllOrders")) || [];

    const notOrderedItems = data.filter((item) => !item.isOrdered);

    if (notOrderedItems.length === 0) {
      toast.warning("All items already ordered");
      return;
    }

    const newOrder = {
      loginUser: notOrderedItems[0]?.loginUser,
      selectedUser: notOrderedItems[0]?.selectedUser,
      products: notOrderedItems.map((item) => item.product),
      totalBill: notOrderedItems.reduce(
        (acc, item) => acc + item.product.price * (item.product.quantity || 1),
        0,
      ),
    };

    // save order
    localStorage.setItem(
      "myAllOrders",
      JSON.stringify([...existingOrders, newOrder]),
    );

    // ✅ mark items as ordered
    const updatedWishlist = data.map((item) =>
      item.isOrdered ? item : { ...item, isOrdered: true },
    );

    setData(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    toast.success("Order placed successfully");
  };
  console.log(filterdata);

  
    return (
      <div className="wishlist-container">
        <h2>My Wishlist</h2>

        <h4>
          Total Order: {data.length} | Total Amount: ₹{totalAmount}
        </h4>

        <button onClick={() => navigate(-1)}>Back</button>

        <input
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />

        {filterdata.length > 0 ? (
          filterdata.map((item, index) => (
            <div key={index} className="card">
              <h3>User: {item.loginUser}</h3>
              <h3>Selected: {item.selectedUser}</h3>

              <div className="cart-item-info">
                <img src={item?.product?.thumbnail} width={120} />

                <p className="item-price">
                  Price: ₹{item?.product?.price} · Qty:{" "}
                  {item?.product?.quantity}
                </p>

                <p className="item-discount">
                  Discount: {item?.product?.discountPercentage}%
                </p>

                <p className="item-final">
                  Final: ₹{item?.product?.discountedTotal}
                </p>
              </div>

              {item.isOrdered && (
                <p style={{ color: "green", fontWeight: "bold" }}>Ordered</p>
              )}

              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          ))
        ) : (
          <h3>No Wishlist Items</h3>
        )}

        <button className="btn-place-order" onClick={handleOrderAll}>
          Place Order →
        </button>
      </div>
    );
  
};

export default Wishlist;
