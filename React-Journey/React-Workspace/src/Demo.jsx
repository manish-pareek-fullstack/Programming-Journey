import { useState, useEffect } from "react";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";

const Demo = () => {
  const [api, setapi] = useState([]);
  const [merge, setmerge] = useState([]);
  const [search, setsearch] = useState("");
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();
  const [toggel, settoggel] = useState(true);
  const [showFull, setShowFull] = useState({});
  useEffect(() => {
    const user = async () => {
      try {
        const result = await axios.get("https://dummyjson.com/products");
        setapi(result.data.products);
        setmerge(result.data.products);
        setloading(false);
      } catch (error) {
        console.log(error);
      }
    };
    user();
  }, []);

  const filterdata = merge.filter((x) =>
    x.title.toLowerCase().includes(search.toLowerCase()),
  );
  //useparents parotectroutes
  const handle = () => {
    setmerge(api);
  };
  const unmerge = () => {
    setmerge(api);
  };

  const even = () => {
    let data1 = merge.filter((a) => a.id % 2 === 0);
    setmerge(data1);
  };

  const odd = () => {
    let data2 = merge.filter((a) => a.id % 2 !== 0);
    setmerge(data2);
  };

  const sortByTitleAsc = () => {
    const sorted = [...merge].sort((a, b) => {
     return  a.title.localeCompare(b.title);
      
    });
    setmerge(sorted);
  };
function btnnevigate() {
  settoggel(!toggel);
  navigate(toggel ? "/About" : "/Help");
}
 
const toggleDescription = (id) => {
  let copy = { ...showFull }; // purana data copy

  copy[id] = !copy[id]; // us id ko ulta karo

  setShowFull(copy); // update state
};
  return (
    <div style={{ padding: "20px", background: "#f5f5f5" }}>
      {/* Button */}
      <button onClick={btnnevigate}>swich the about file</button>
      <button
        onClick={handle}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Merge Products
      </button>
      <button onClick={unmerge}>unmerge</button>
      <button onClick={sortByTitleAsc}>Sort Title A→Z</button>
      <button onClick={odd}>odd</button>
      <button onClick={even}>even</button>

      <div>
        <input
          type="search"
          value={search}
          placeholder="search the item"
          onChange={(e) => setsearch(e.target.value)}
        />
      </div>
      {/* Grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <PacmanLoader color="#007bff" size={50} />
          </div>
        ) : filterdata.length === 0 ? (
          <div>
            {" "}
            <h2>No Data Found </h2>
          </div>
        ) : (
          filterdata.map((item) => (
            <div
              key={item.id}
              style={{
                width: "300px",
                background: "#fff",
                borderRadius: "10px",
                padding: "15px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                transition: "0.3s",
              }}
            >
              {/* Image */}
              {/* <img
              src={item.thumbnail}
              alt={item.title}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            /> */}
              <LazyLoadImage effect="blur" src={item.thumbnail} />
              {item.id}
              {/* Title */}
              <h3 style={{ margin: "10px 0", color: "#333" }}>{item.title}</h3>

              {/* Basic Info */}
              <p>
                {showFull[item.id]
                  ? item.description
                  : item.description.slice(0, 50) + "..."}

                <span
                  onClick={() => toggleDescription(item.id)}
                  style={{ color: "blue", cursor: "pointer" }}
                >
                  {showFull[item.id] ? " Read Less" : " Read More"}
                </span>
              </p>

              <p>
                <strong>Category:</strong> {item.category}
              </p>
              <p>
                <strong>Price:</strong> ₹{item.price}
              </p>
              <p>
                <strong>Discount:</strong> {item.discountPercentage}%
              </p>
              <p>
                <strong>Rating:</strong> ⭐ {item.rating}
              </p>
              <p>
                <strong>Stock:</strong> {item.stock}
              </p>

              {/* Tags */}
              <div style={{ margin: "8px 0" }}>
                {item.tags?.map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      background: "#eee",
                      padding: "3px 8px",
                      margin: "2px",
                      borderRadius: "5px",
                      fontSize: "12px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p>
                <strong>Brand:</strong> {item.brand}
              </p>
              <p>
                <strong>SKU:</strong> {item.sku}
              </p>
              <p>
                <strong>Weight:</strong> {item.weight}
              </p>

              {/* Dimensions */}
              <div>
                <strong>Dimensions:</strong>
                <div style={{ fontSize: "13px" }}>
                  <p>W: {item.dimensions?.width}</p>
                  <p>H: {item.dimensions?.height}</p>
                  <p>D: {item.dimensions?.depth}</p>
                </div>
              </div>

              <p>
                <strong>Warranty:</strong> {item.warrantyInformation}
              </p>
              <p>
                <strong>Shipping:</strong> {item.shippingInformation}
              </p>
              <p>
                <strong>Status:</strong> {item.availabilityStatus}
              </p>

              {/* Reviews */}
              <div style={{ marginTop: "10px" }}>
                <h4>Reviews:</h4>
                {item.reviews?.map((a, index) => (
                  <div
                    key={index}
                    style={{
                      borderTop: "1px solid #ddd",
                      marginTop: "5px",
                      paddingTop: "5px",
                      fontSize: "13px",
                    }}
                  >
                    <p>⭐ {a.rating}</p>
                    <p>{a.comment}</p>
                    <p>{new Date(a.date).toLocaleDateString()}</p>
                    <p>{a.reviewerName}</p>
                    <p>{a.reviewerEmail}</p>
                  </div>
                ))}
              </div>

              <p>
                <strong>Return Policy:</strong> {item.returnPolicy}
              </p>
              <p>
                <strong>Min Order:</strong> {item.minimumOrderQuantity}
              </p>

              {/* Meta */}
              <div style={{ marginTop: "10px", fontSize: "12px" }}>
                <h5>Meta</h5>
                <p>Created: {item.meta?.createdAt}</p>
                <p>Updated: {item.meta?.updatedAt}</p>
                <p>Barcode: {item.meta?.barcode}</p>
                <p>QR: {item.meta?.qrCode}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Demo;
