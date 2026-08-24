// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import "./Newapi.css";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import "react-lazy-load-image-component/src/effects/blur.css";
// import { useNavigate } from 'react-router-dom';
// const Newapi = ({ objhome2 }) => {
//   const [search, setsearch] = useState("");
//   const [price, setprice] = useState(objhome2.productss);
//   const [sort, setsort] = useState("");
//   const navigate = useNavigate();
//   const [selectedval, setSelectedval] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const filterobj = price.filter(
//     (x) =>
//       x.title.toLowerCase().includes(search.toLowerCase()) ||
//       x.description.toLowerCase().includes(search.toLowerCase()),
//   );
//   const res = [...filterobj];
//   if (sort === "low") {
//     res.sort((a, b) => a.price - b.price);
//   }
//   if (sort === "high") {
//     res.sort((a, b) => b.price - a.price);
//   }
//   if (sort === "rating") {
//     res.sort((a, b) => a.rating - b.rating);
//   }
//   if (sort === "ratinghigh") {
//     res.sort((a, b) => b.rating - a.rating);
//   }

//   const handellow = () => {
//     const dataprice = [...price].sort((a, b) => a.price - b.price);
//     setprice(dataprice);
//   };
//   const handelhight = () => {
//     const datapricehig = [...price].sort((a, b) => b.price - a.price);
//     setprice(datapricehig);
//   };
//   const reserthandel = () => {
//     setprice([...objhome2.productss]);
//   };
//   console.log(res);
//   return (
//     <main>
//       <button onClick={handellow}>price in low to high price</button>
//       <button onClick={handelhight}>price hig to low</button>
//       <button onClick={reserthandel}>resert</button>
//       {/* model ui  */}

//       <form>
//         <input
//           type="search"
//           placeholder="serach the val"
//           value={search}
//           onChange={(e) => setsearch(e.target.value)}
//         />
//         <label>
//           {" "}
//           select the opt
//           <select value={sort} onChange={(e) => setsort(e.target.value)}>
//             <option value="">select the val</option>
//             <option value="low">low price</option>
//             <option value="high">high price</option>
//             <option value="rating">low rating</option>
//             <option value="ratinghigh">high to low rading</option>
//           </select>
//         </label>
//       </form>
//       <div className="container">
//         {res.map((val) => (
//           <div key={val.id} className="card">
//             {/* Image upar */}
//             <div className="card-image">
//               <LazyLoadImage
//                 src={val.images}
//                 effect="blur"
//                 wrapperProps={{
//                   style: { transitionDelay: "2s" },
//                 }}
//               />
//             </div>

//             <div className="card-content">
//               <p className="card-id">#{val.id}</p>
//               <h3 className="card-title">{val.title}</h3>

//               <div className="card-desc">
//                 <p>description: {val.description}</p>
//               </div>

//               <div className="card-category">
//                 <p>category: {val.category}</p>
//               </div>

//               <div className="card-price">
//                 <p>price: {val.price}</p>
//                 <button onClick={() => navigate(`/products/${val.id}`)}>
//                   view
//                 </button>
//               </div>

//               <div className="card-rating">
//                 <p>rating: {val.rating}</p>
//               </div>

//               <div className="card-stock">
//                 <p>stock: {val.stock}</p>
//               </div>

//               <div className="card-tags">
//                 {val.tags.map((x, index) => (
//                   <span key={index}>
//                     {x}
//                     {","}{" "}
//                   </span>
//                 ))}
//               </div>

//               <div className="card-reviews">
//                 <h4>reviews:</h4>
//                 {val.reviews.map((x, index) => (
//                   <div key={index} className="review">
//                     <p>rating: {x.rating}</p>
//                     <p>comment: {x.comment}</p>
//                     <p>reviewerName: {x.reviewerName}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// };

// // export default Newapi

import React, { useEffect, useState } from "react";
import "./Newapi.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Newapi = () => {
  const [search, setsearch] = useState("");
  const [price, setprice] = useState([]);
  const [sort, setsort] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  // ✅ API FETCH
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products");
        setprice(res.data.products); // 👈 important
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  // 🔍 Filter
  const filterobj = price.filter(
    (x) =>
      x.title.toLowerCase().includes(search.toLowerCase()) ||
      x.description.toLowerCase().includes(search.toLowerCase()),
  );

  // 🔄 Sort
  const res = [...filterobj];

  if (sort === "low") res.sort((a, b) => a.price - b.price);
  if (sort === "high") res.sort((a, b) => b.price - a.price);
  if (sort === "rating") res.sort((a, b) => a.rating - b.rating);
  if (sort === "ratinghigh") res.sort((a, b) => b.rating - a.rating);

  // 🔁 Reset
  const reserthandel = () => {
    setsearch("");
    setsort("");
    setSelectedId(null);
  };

  return (
    <main>
      <form>
        <input
          type="search"
          placeholder="search the val"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />

        <select value={sort} onChange={(e) => setsort(e.target.value)}>
          <option value="">Select</option>
          <option value="low">Low Price</option>
          <option value="high">High Price</option>
          <option value="rating">Low Rating</option>
          <option value="ratinghigh">High Rating</option>
        </select>

        <button type="button" onClick={reserthandel}>
          Reset
        </button>
      </form>

      <div className="container">
        {res
          .filter((val) => selectedId === null || val.id === selectedId)
          .map((val) => (
            <div key={val.id} className="card">
              <div className="card-image">
                <LazyLoadImage src={val.thumbnail} effect="blur" />
              </div>

              <div className="card-content">
                <p>#{val.id}</p>
                <h3>{val.title}</h3>
                <p>{val.description}</p>
                <p>Category: {val.category}</p>
                <p>Price: {val.price}</p>
                <button
                  onClick={() =>
                    navigate(`/products/${val.id}`, {
                      state: val,
                    })
                  }
                >
                  View Product
                </button>
                {selectedId !== val.id && (
                  <button onClick={() => setSelectedId(val.id)}>
                    View Detail
                  </button>
                )}

                {selectedId === val.id && (
                  <div className="extra-detail">
                    <p>Rating: {val.rating}</p>
                    <p>Stock: {val.stock}</p>

                    <button onClick={() => setSelectedId(null)}>Back</button>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </main>
  );
};

export default Newapi;

