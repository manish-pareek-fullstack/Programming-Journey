// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const Child = () => {
//   const [da, setda] = useState([]);
//   const [cdata, setcdata] = useState(null);
//   const [search, setsearch] = useState("");

//   const fatch = async () => {
//     const res = await axios.get("https://dummyjson.com/recipes");
//     setda(res.data.recipes);
//   };

//   useEffect(() => {
//     fatch();
//   }, []);

 
//   const filterdata = da.filter((i) =>
//     i.name.toLowerCase().includes(search.toLowerCase()),
//   );

//   return (
//     <div>
//       <input
//         type="search"
//         placeholder="Search recipe..."
//         value={search}
//         onChange={(e) => setsearch(e.target.value)}
//       />

    
//       {filterdata.map((x) => (
//         <div key={x.id}>
//           <h3>{x.name}</h3>
//           <img src={x.image} width={100} alt="" />

//           <button onClick={() => setcdata(x)}>View</button>
//         </div>
//       ))}

      
//       {cdata && (
//         <div>
//                   <h2>{cdata.name}</h2>
//                   <img src={cdata.image} alt="" width={100} />
//           <p>{cdata.instructions}</p>
//           <p>Rating: {cdata.rating}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Child;


import React from 'react'
import { Link } from 'react-router-dom'

const Child = () => {
  return (
    <div>
      child
    </div>
  )
}

export default Child

