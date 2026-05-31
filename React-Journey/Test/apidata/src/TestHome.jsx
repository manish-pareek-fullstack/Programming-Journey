import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TestHome.css";
const TestHome = ({send}) => {
  const [apidata, setapi] = useState([]); //sabse pahle api ko store kiya ak state me 
  const [search, setsearch] = useState(""); // serach krne ke liye 
  const [cdata, setcdata] = useState([]); // card me data add kiya jo bhi user click kregea vo 
  const [store, setstore] = useState(null); // 

  const fatch = async () => {
    const res = await axios.get(
      "https://dummyjson.com/products/category/smartphones",
    );
    setapi(res.data.products);
   
  };

  useEffect(() => {
    fatch();
     send(cdata);// parents se child ko data send rahe hai 
  }, [cdata]);

  const filterdata = apidata.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()), // serach krne ka work ho raha hai 
  );

  // ➕ Add / Increment
  function handeladd(x) {
    const exist = cdata.find((item) => item.id === x.id); 
// agar card me id === api id hai to true ya false return krege 
    if (!exist) { // agar false hai to card data me quantity name ki ak key bna ke inisil value 1 kr do 
      setcdata([...cdata, { ...x, quantity: 1 }]);
    } else {
      // agar card me id === api me id  hai to quantity ko increment krte rahe ge
      const updated = cdata.map((item) =>
        item.id === x.id ? { ...item, quantity: item.quantity + 1 } : item,
      );
      setcdata(updated);
    }
  }

  // ➖ Remove / Decrement
  function handleRemove(x) {
    const exist = cdata.find((item) => item.id === x.id);

    if (exist.quantity === 1) {
      setcdata(cdata.filter((item) => item.id !== x.id));
    } else {
      const updated = cdata.map((item) =>
        item.id === x.id ? { ...item, quantity: item.quantity - 1 } : item,
      );
      setcdata(updated);
    }
  }

  return (
    <div>
      {/* 🔍 Search */}
      <input
        type="search"
        placeholder="Search..."
        value={search}
        onChange={(e) => setsearch(e.target.value)}
      />

      {/* 🛍 Product List */}
      {filterdata.map((x) => {
        const item = cdata.find((i) => i.id === x.id);

        return (
          <div
            key={x.id}
            style={{ border: "1px solid black", margin: 10, padding: 10 }}
          >
            <h3>{x.title}</h3>
            <img src={x.thumbnail} width="120" />
            <p>{x.description}</p>
            <p>₹ {x.price}</p>

            {/* Cart UI */}
            {!item ? (
              <button onClick={() => handeladd(x)}>Add To Cart</button>
            ) : (
              <div>
                <button onClick={() => handleRemove(x)}>➖</button>
                <span>{item.quantity}</span>
                <button onClick={() => handeladd(x)}>➕</button>
              </div>
            )}

            <br />
            <button onClick={() => setstore(x)}>View Detail</button>
          </div>
        );
      })}

      {/* 📦 Detail View */}
      {store && (
        <div style={{ border: "2px solid black", padding: 20, marginTop: 20 }}>
          <h2>{store.title}</h2>

          {/* Images */}
          {store.images.map((img, i) => (
            <img key={i} src={img} width="100" />
          ))}

          <p>{store.description}</p>
          <p>Price: ₹ {store.price}</p>
          <p>Brand: {store.brand}</p>
          <p>Rating: ⭐ {store.rating}</p>

          {/* Dimensions */}
          <p>Width: {store.dimensions.width}</p>
          <p>Height: {store.dimensions.height}</p>
          <p>Depth: {store.dimensions.depth}</p>

          <p>Warranty: {store.warrantyInformation}</p>
          <p>Shipping: {store.shippingInformation}</p>
          <p>Status: {store.availabilityStatus}</p>

          {/* Reviews */}
          <h3>Reviews:</h3>
          {store.reviews.map((rev, i) => (
            <div key={i} style={{ borderBottom: "1px solid gray" }}>
              <p>⭐ {rev.rating}</p>
              <p>{rev.comment}</p>
              <p>- {rev.reviewerName}</p>
            </div>
          ))}

          {/* Cart Control */}
          {cdata.some((item) => item.id === store.id) ? (
            <div>
              <button onClick={() => handleRemove(store)}>➖</button>
              <span>{cdata.find((i) => i.id === store.id).quantity}</span>
              <button onClick={() => handeladd(store)}>➕</button>
            </div>
          ) : (
            <button onClick={() => handeladd(store)}>Add To Cart</button>
          )}

          <br />
          <br />
          <button onClick={() => setstore(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default TestHome;
