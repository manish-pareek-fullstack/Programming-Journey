import React from "react";
import { useGetUserQuery } from "./app/apislice.js";
const Home = () => {
  const { data,error,isLoading } = useGetUserQuery();
  console.log(">>>>>>>>>>>>>>>>", data);
  console.log('error', error)
  return <div>home

    
  </div>;
};

export default Home;
