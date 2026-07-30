import axios from "axios";
import React, { useEffect, useState } from "react";
const Home = () => {
  const [api, setData] = useState([]);
  useEffect(() => {
    const data = async () => {
      try {
        const result = await axios.get("https://dummyjson.com/users");
        const response = await axios.post("http://localhost:8000/users", result.data.users);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    data();
  }, []);
  return <div></div>;
};
export default Home;
