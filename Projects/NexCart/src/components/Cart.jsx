import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { fatchcart, deleteProduct, placeOrder } from "../slice/slicecart.js";
import { toast } from "react-toastify";

const Cart = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartData, loading } = useSelector((state) => state.cart);

  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("");

  // ✅ loginUser — Login.jsx me "user" key se save hota hai
  const loginUserObj = JSON.parse(localStorage.getItem("user"));
  const loginUser = loginUserObj?.email || "Guest";

  // FETCH CART
  useEffect(() => {
    dispatch(fatchcart(id));
  }, [id]);

  // ✅ selectedUser — cart ke userId se users list me dhundho
  const userId = cartData[0]?.userId;
  const allUsers = JSON.parse(localStorage.getItem("users")) || [];
  const selectedUserObj = allUsers.find((u) => u.id === userId);
  const selectedUser = selectedUserObj
    ? `${selectedUserObj.firstName} ${selectedUserObj.lastName}`
    : `User-${userId}`;

  // FILTER
  const filteredData = useMemo(() => {
    return cartData.map((cart) => ({
      ...cart,
      products: cart.products.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()),
      ),
    }));
  }, [cartData, search]);

  // SORT
  const sortedData = useMemo(() => {
    return filteredData.map((cart) => {
      let products = [...cart.products];
      if (sortType === "priceLow") products.sort((a, b) => a.price - b.price);
      else if (sortType === "priceHigh")
        products.sort((a, b) => b.price - a.price);
      else if (sortType === "qty")
        products.sort((a, b) => b.quantity - a.quantity);
      return { ...cart, products };
    });
  }, [filteredData, sortType]);

  // TOTAL BILL
  const totalBill = sortedData.reduce((acc, cart) => {
    return (
      acc +
      cart.products.reduce((sum, item) => sum + item.price * item.quantity, 0)
    );
  }, 0);

  // CHECK ALL ORDERED
  const allOrdered = sortedData[0]?.products.every((item) => item.isOrdered);

  // DELETE
  const handleDelete = (itemId) => {
    dispatch(deleteProduct(itemId));
  };

  // ✅ PLACE ORDER → myAllOrders me localStorage save
  const handlePlaceOrder = () => {
    const unorderedProducts = sortedData[0]?.products.filter(
      (item) => !item.isOrdered,
    );

    if (!unorderedProducts || unorderedProducts.length === 0) {
     toast.info("All items have already been ordered. ✅");
      return;
    }

    const newOrder = {
      loginUser,
      selectedUser,
      products: unorderedProducts,
      totalBill: unorderedProducts.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      ),
      orderedAt: new Date().toISOString(),
    };

    const existingOrders =
      JSON.parse(localStorage.getItem("myAllOrders")) || [];

    localStorage.setItem(
      "myAllOrders",
      JSON.stringify([...existingOrders, newOrder]),
    );

    dispatch(placeOrder()); // Redux state update
    toast.success("Order placed successfully! 🎉");
  };

  // ✅ ADD TO WISHLIST
  const handleAddToWishlist = (item) => {
    const existing = JSON.parse(localStorage.getItem("wishlist")) || [];

    const alreadyExists = existing.some(
      (w) => w.product?.id === item.id && w.loginUser === loginUser,
    );

    if (alreadyExists) {
    toast.warning("This item is already in your wishlist! ❤️");
      return;
    }

    const wishlistItem = {
      loginUser,
      selectedUser,
      product: item,
      isOrdered: false,
    };

    localStorage.setItem(
      "wishlist",
      JSON.stringify([...existing, wishlistItem]),
    );
  toast.success(`"${item.title}" has been added to your wishlist! ♡`);
  };

  if (loading) return <Loader />;

  return (
    <div className="cart-container">

      {/* HEADER */}
      <div className="cart-header">
        <button className="btn-back" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h2>Cart</h2>
      </div>

      {/* CONTROLS */}
      <div className="controls-bar">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setSortType(e.target.value)}>
          <option value="">Sort By</option>
          <option value="priceLow">Price Low to High</option>
          <option value="priceHigh">Price High to Low</option>
          <option value="qty">Quantity</option>
        </select>
      </div>

      {/* CART DATA */}
      {sortedData.map((cart) => (
        <div className="cart-card" key={cart.id}>
          <h3>Cart ID: {cart.id}</h3>

          {cart.products.length > 0 ? (
            cart.products.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.thumbnail} width={90} alt={item.title} />

                <div className="cart-item-info">
                  <p className="item-title">{item.title}</p>
                  <p className="item-price">
                    Price: ₹{item.price} · Qty: {item.quantity}
                  </p>
                  <p className="item-discount">
                    Discount: {item.discountPercentage}%
                  </p>
                  <p className="item-final">Final: ₹{item.discountedTotal}</p>
                </div>

                {item.isOrdered && (
                  <p style={{ color: "green", fontWeight: "bold" }}>
                    Ordered ✅
                  </p>
                )}

                {/* ✅ Wishlist Button */}
                <button
                  className="btn-wishlist"
                  disabled={item.isOrdered}
                  onClick={() => handleAddToWishlist(item)}
                >
                  ♡ Wishlist
                </button>

                <button
                  className="btn-delete"
                  disabled={item.isOrdered}
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <div className="cart-empty">
              <div className="empty-icon">📭</div>
              <p>No products found</p>
            </div>
          )}
        </div>
      ))}

      {/* FOOTER */}
      <div className="cart-footer">
        <div className="cart-total-row">
          <span className="label">Total Bill</span>
          <span className="amount">₹{totalBill.toFixed(2)}</span>
        </div>
        <div className="cart-footer-actions">
          <button
            className="btn-wishlist"
            onClick={() => navigate("/Wishlist")}
          >
            ♡ Wishlist
          </button>
          <button
            className="btn-place-order"
            disabled={allOrdered}
            onClick={handlePlaceOrder}
          >
            {allOrdered ? "Already Ordered" : "Place Order →"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
