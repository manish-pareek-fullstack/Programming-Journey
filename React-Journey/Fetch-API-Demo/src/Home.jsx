import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { ClipLoader } from "react-spinners";
import "./Home.css";

const Home = ({ cdata, setcdata }) => {
  const [apidata, setapi] = useState([]);
  const [showmodel, setshowmodel] = useState(false);
  const [selectid, setselectid] = useState(null);

  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");

  // API CALL
  const fatch = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://fakestoreapi.com/products");
      setapi(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fatch();
  }, []);

  // CATEGORY FILTER
  const filteredData =
    category === "all"
      ? apidata
      : apidata.filter((item) => item.category === category);

  // SEARCH FILTER
  const searchData = filteredData.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  // SORT FILTER
  const finalData = [...searchData].sort((a, b) => {
    if (sort === "high") return b.price - a.price;
    if (sort === "low") return a.price - b.price;
    return 0;
  });

  return (
    <div>
      {/* NAV */}
      <Link to="/Card">Go to Cart ({cdata.length})</Link>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* CATEGORY */}
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All</option>
        <option value="men's clothing">Men's Clothing</option>
        <option value="jewelery">Jewelery</option>
        <option value="electronics">Electronics</option>
        <option value="women's clothing">Women's Clothing</option>
      </select>

      {/* SORT */}
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="">Sort</option>
        <option value="high">High Price</option>
        <option value="low">Low Price</option>
      </select>

      {/* PRODUCTS */}
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <ClipLoader color="#000" loading={loading} size={50} />
        </div>
      ) : (
        finalData.map((x) => (
          <div
            key={x.id}
            style={{
              border: "1px solid gray",
              margin: "10px",
              padding: "10px",
            }}
          >
            <div>{x.id}</div>

            <LazyLoadImage
              src={x.image}
              alt={x.title}
              height={100}
              effect="blur"
            />

            <h3>{x.title}</h3>
            <p>₹ {x.price}</p>

            {/* CART */}
            <button
              onClick={() => {
                const exist = cdata.find((cid) => cid.id === x.id);

                if (!exist) {
                  setcdata([x, ...cdata]);
                } else {
                  const updated = cdata.filter((item) => item.id !== x.id);
                  setcdata(updated);
                }
              }}
            >
              {cdata.find((cid) => cid.id === x.id)
                ? "Remove from Cart"
                : "Add to Cart"}
            </button>

            {/* MODAL */}
            <button
              onClick={() => {
                setselectid(x);
                setshowmodel(true);
              }}
            >
              View Details
            </button>
          </div>
        ))
      )}

      {/* MODAL UI */}
      {showmodel && selectid && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              width: "300px",
              borderRadius: "10px",
            }}
          >
            <LazyLoadImage
              src={selectid.image}
              alt={selectid.title}
              width="100%"
              effect="blur"
            />

            <h2>{selectid.title}</h2>
            <p>₹ {selectid.price}</p>
            <p>{selectid.description}</p>

            <button onClick={() => setshowmodel(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
