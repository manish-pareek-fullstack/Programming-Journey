import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { increment,decrement } from "./slice/slicecounter";
function Home() {
  
  const couter = useSelector((state) => state.couter);
  console.log(couter)
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");

  let input = useRef();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handelnavigate = () => {
    navigate("/about");
  };

  const handellocation = () => {
    navigate("/about", {
      state: {
        name: "manish",
        age: 25,
      },
    });
  };

  function handelclick() {
    console.log(input.current.value);
  }

  // API Fetch
  const fatchdata = async () => {
    try {
      setloading(true);
      seterror("");

      const res = await axios.get("https://dummyjson.com/products");

      setdata(res.data.products);
    } catch (err) {
      console.log(err);

      seterror("Failed to fetch data");
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fatchdata();
  }, []);

  return (
    <div>
      <h1>
        {" "}
        <div>
          <button onClick={handelnavigate}>navigate to about</button>
          <button onClick={handellocation}>location</button>
        </div>
      </h1>
      <div>
        <button onClick={()=>dispatch(increment())}>incremet</button>
        <button onClick={()=>dispatch(decrement())}>decremnt</button>
     </div>
      <input type="text" placeholder="enter the name" ref={input} />
      <input type="button" value="click" onClick={handelclick} />
      {loading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
      {data.map((item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <p>{item.category}</p>
          <p>{item.price}</p>
          <p>{item.discountPercentage}</p>
          <p>{item.rating}</p>
          <p>{item.stock}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
