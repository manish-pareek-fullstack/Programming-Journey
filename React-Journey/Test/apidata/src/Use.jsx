import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {use} from 'react'
const prodetdeteil = axios
  .get("https://fakestoreapi.com/products")
  .then((res) => res.data);

const Use = () => {
    const data = use(prodetdeteil);
    console.log(data)
    
  return (
    <div>
      use hook
      {data.map((x) => (
        <div key={x.id}>
          <h2> {x.id}</h2>
          <div>
            <img src={x.image} alt="" width={100} />
          </div>

          {x.title}
          <div>{x.price}</div>
          <div>{x.description}</div>
          <div>{x.category}</div>

          {x.rating?.rate}
          <div>{x.rating?.count}</div>
        </div>
      ))}
    </div>
  );
}

export default Use
