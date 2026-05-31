import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import Card from "./Card";
import Modelcard from "./Modelcard";
function App() {
  const [cdata, setcdata] = useState([]);
  return (
    <div className="App">
      <BrowserRouter>
        <Header cdata={cdata} />

        <Routes>
          <Route path="/Modelcard" element={<Modelcard />} />
          <Route
            path="/"
            element={<Home cdata={cdata} setcdata={setcdata} />}
          />
          <Route path="/Header" element={<Header cdata={cdata} />} />
          <Route path="/Card" element={<Card cdata={cdata} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
