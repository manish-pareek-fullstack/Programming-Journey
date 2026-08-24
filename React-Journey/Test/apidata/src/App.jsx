import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Form from "./Form";
import Abc from "./Abc";
// export const Contectabc = createContext("abc");
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/Abc" element={<Abc  />} />
        <Route path="/Form" element={<Form/>} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
      //    <Contectabc.Provider value="manish">
      //   <Home />
      // </Contectabc.Provider>
  );
}

export default App;
