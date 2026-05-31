import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import { useState } from "react";
import Form from "./Form";
import Abc from "./Abc";

function App() {
  const [form, setForm] = useState({
    name: "",
    password: "",
    email: "",
    age: "",
    course: "",
  });

  console.log("app", form);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/Abc" element={<Abc formabc={form}formabcset={setForm} />} />
        <Route path="/Form" element={<Form form={form} setForm={setForm} />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
