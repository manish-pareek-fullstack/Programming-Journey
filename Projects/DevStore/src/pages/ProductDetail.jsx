import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PacmanLoader } from "react-spinners";

const ProductDetail = () => {
  const [loading, setloading] = useState(true);
  const [data, setdata] = useState({});
  const { id } = useParams();

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
        <PacmanLoader />
      ) : (
        <>
          <h1>{data.title}</h1>
          <img src={data.thumbnail} width="200" />
          <p>{data.description}</p>
          <h2>₹{data.price}</h2>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
