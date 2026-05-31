import Home from "./Home";
import Header from "./Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import From from "./From";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Header" element={<Header />}></Route>
          <Route path="/From" element={<From />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
