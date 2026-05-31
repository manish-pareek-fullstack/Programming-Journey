import React from "react";
import { useNavigate } from "react-router-dom";
// import "./Card.css";

const Cart = ({ cdata, setcdata }) => {
  const navigate = useNavigate();

  const totalprice = cdata.reduce((acc, a) => {
    return acc + a.price;
  }, 0);

  return (
    <div>
      <button onClick={() => navigate(-1)}>Go Back</button>

      <div>
        <h3>Total: ₹ {totalprice.toFixed(2)}</h3>
        <h3>card title {cdata.map((x) => x.title)}</h3>
      </div>

      {cdata.map((i) => (
        <div key={i.id}>
          <div>{i.id}</div>

          <div>
            <img src={i.image} alt="" width="100" />
          </div>

          <div>title: {i.title}</div>
          <div>price: {i.price}</div>
          <div>description: {i.description}</div>
          <div>category: {i.category}</div>

          <div>
            rating: {i.rating.rate} ({i.rating.count})
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
