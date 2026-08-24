import React, { useContext } from "react";
import { AbcContect } from "./App";
const Child1 = () => {
  const abc = useContext(AbcContect);
  console.log("abc", abc);
  return <div>child1</div>;
};

export default Child1;
