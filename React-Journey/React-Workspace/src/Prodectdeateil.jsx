import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { PacmanLoader } from "react-spinners";

const Prodectdeateil = () => {
  const [loading, setloading] = useState(true);
  const [data, setdata] = useState({});
  const { id } = useParams();
  const location = useLocation();
  console.log(location);
  console.log("location", location.state);

  const fetchData = async () => {
    const result = await axios.get(`https://dummyjson.com/products/${id}`);
    setdata(result.data);
    setloading(false);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div>
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
      ) : (
        data.id
      )}
      <h1>{data.title}</h1>
      <img src={data.thumbnail} width="200" />
      <p>{data.description}</p>
      <h2>Price: ₹{data.price}</h2>
      <p>discount{data.discountPercentage}</p>
      <p>rating{data.rating}</p>
      <p>sto{data.stock}</p>
      <p>
        tag:{" "}
        {data.tags?.map((tag, i) => (
          <span key={i}>{tag} </span>
        ))}
      </p>
    </div>
  );
};

export default Prodectdeateil;
