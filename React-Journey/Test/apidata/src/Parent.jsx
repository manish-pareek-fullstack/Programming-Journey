import React, { useState } from "react";
import Child from "./Child";

const Parent = () => {
  const [apidata, setapidata] = useState([]);

  function handel(data) {
      setapidata(data); 
      console.log(data);
  }

  return (
    <div>
      <Child senddata={handel} />

      <h1>Parent Component</h1>
      {apidata.map((x) => (
        <div>
          {x.id}
          <div>
            <img src={x.image} alt="" width={100} />
          </div>
          {x.title}
          <div>{x.price}</div>
          <div>{x.description}</div>
          <div>{x.category}</div>
          {x.rating.rate}
          <div>{x.rating.count}</div>
        </div>
      ))}
    </div>
  );
};

export default Parent;
