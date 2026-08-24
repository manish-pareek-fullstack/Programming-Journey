import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios, { Axios } from 'axios';

const Childapi = ({ sendchilddata }) => {
  const fatch = async () => {
    const res = await axios.get("https://fakestoreapi.com/products");
    sendchilddata(res.data);
  };
    useEffect(() => {
        fatch();
},[])
  return <div>sendchilddata</div>;
};

export default Childapi
