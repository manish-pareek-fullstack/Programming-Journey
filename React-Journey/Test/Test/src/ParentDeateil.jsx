import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ParentDetail = () => {
  const { id } = useParams(); 
  const location = useLocation(); 
  const navigate = useNavigate();

  const [data, setData] = useState(location.state || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!data) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://dummyjson.com/recipes/${id}`);
      setData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (!data) return <h2>No Data Found</h2>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>⬅ Back</button>

      <h2>{data.name}</h2>
      <img src={data.image} alt="" width="200" />
      <p>
        <b>Cuisine:</b> {data.cuisine}
      </p>
      <p>
        <b>Rating:</b> {data.rating}
      </p>

      <h3>Ingredients:</h3>
      <ul>
        {data.ingredients?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ParentDetail;
