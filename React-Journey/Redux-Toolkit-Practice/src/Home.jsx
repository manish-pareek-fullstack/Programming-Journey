import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
// import {productadd} from '../src/Slice/slicesignup'
const Home = () => {
  const dispatch = useDispatch();
  const fatch = async() => {
  const res = await axios.get("https://dummyjson.com/products");
  dispatch(productadd(res.data.products));
  }
 
  useEffect(() => {
   fatch();
   
  },[])
 
  return (
    <div>
      home
    
    </div>
  );
}

export default Home
