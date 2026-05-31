import React, { useEffect, useState } from "react";
// import "./Newapi.css";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Home = () => {
  const [search, setsearch] = useState("");
  const [price, setprice] = useState([]);
  const [sort, setsort] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // ✅ API fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products");
        setprice(res.data.products);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // 🔍 Filter
  const filterobj = price.filter(
    (x) =>
      x.title.toLowerCase().includes(search.toLowerCase()) ||
      x.description.toLowerCase().includes(search.toLowerCase()),
  );

  // 🔄 Sort
  const res = [...filterobj];

  if (sort === "low") res.sort((a, b) => a.price - b.price);
  if (sort === "high") res.sort((a, b) => b.price - a.price);
  if (sort === "rating") res.sort((a, b) => a.rating - b.rating);
  if (sort === "ratinghigh") res.sort((a, b) => b.rating - a.rating);

  // 🔁 Reset
  const reserthandel = () => {
    setsearch("");
    setsort("");
    setSelectedId(null);
  };

  return (
    <main>
      {/* 🔍 Search + Sort */}
      <form>
        <input
          type="search"
          placeholder="search the val"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />

        <select value={sort} onChange={(e) => setsort(e.target.value)}>
          <option value="">Select</option>
          <option value="low">Low Price</option>
          <option value="high">High Price</option>
          <option value="rating">Low Rating</option>
          <option value="ratinghigh">High Rating</option>
        </select>

        <button type="button" onClick={reserthandel}>
          Reset
        </button>
      </form>

      {/* 🧾 Cards */}
      <div className="container">
        {res
          .filter((val) => selectedId === null || val.id === selectedId)
          .map((val) => (
            <div key={val.id} className="card">
              {/* 🔹 Image */}
              <div className="card-image">
                <LazyLoadImage src={val.images[0]} effect="blur" />
              </div>

              {/* 🔹 Basic Info */}
              <div className="card-content">
                <p>#{val.id}</p>
                <h3>{val.title}</h3>
                <p>{val.description}</p>
                <p>Category: {val.category}</p>
                <p>discountPercentage: {val.discountPercentage}</p>
                <p>Price: {val.price}</p>

                {selectedId !== val.id && (
                  <button onClick={() => setSelectedId(val.id)}>
                    View Detail
                  </button>
                )}

                {/* 🔥 Detail */}
                {selectedId === val.id && (
                  <div className="extra-detail">
                    <p>Rating: {val.rating}</p>
                    <p>Stock: {val.stock}</p>

                    <div>
                      <strong>Tags:</strong>
                      {val.tags?.map((x, i) => (
                        <span key={i}> {x}, </span>
                      ))}
                    </div>

                    <div>
                      <p>
                        <strong>Brand:</strong> {val.brand}
                      </p>
                      <p>
                        <strong>SKU:</strong> {val.sku}
                      </p>
                      <p>
                        <strong>Weight:</strong> {val.weight}
                      </p>

                      <div>
                        <strong>Dimensions:</strong>
                        <div>
                          <p>W: {val.dimensions?.width}</p>
                          <p>H: {val.dimensions?.height}</p>
                          <p>D: {val.dimensions?.depth}</p>
                        </div>
                      </div>

                      <p>
                        <strong>Warranty:</strong> {val.warrantyInformation}
                      </p>
                      <p>
                        <strong>Shipping:</strong> {val.shippingInformation}
                      </p>
                      <p>
                        <strong>Status:</strong> {val.availabilityStatus}
                      </p>
                    </div>

                    <div>
                      <strong>Reviews:</strong>
                      {val.reviews?.map((x, i) => (
                        <div key={i}>
                          <p>Rating: {x.rating}</p>
                          <p>{x.comment}</p>
                          <p>{x.reviewerName}</p>
                          <p>{x.reviewerEmail}</p>
                        </div>
                      ))}
                    </div>

                    <div>
                      <p>
                        <strong>Return Policy:</strong> {val.returnPolicy}
                      </p>
                      <p>
                        <strong>Min Order:</strong> {val.minimumOrderQuantity}
                      </p>

                      <div>
                        <h5>Meta</h5>
                        <p>Created: {val.meta?.createdAt}</p>
                        <p>Updated: {val.meta?.updatedAt}</p>
                        <p>Barcode: {val.meta?.barcode}</p>
                        <p>QR: {val.meta?.qrCode}</p>
                      </div>
                    </div>

                    <button onClick={() => setSelectedId(null)}>Back</button>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </main>
  );
};

export default Home;
