import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Couter from "./Couter";
import Header from "./Header";
import Notfound from "./notfound";
import Deatel from "./Deatel";
import Caculeter from "./Caculeter";
import Signup from "./Signup";
import Login from "./Login";
import New from "./New";
import Newapi from "./Newapi";
import axios from "axios";
import Test from "./Test";
import Demo from "./Demo";
import Protect from "./Protect";
import Event from "./Event";
import Com from "./Com";
import Otp from "./Otp";
import Prodectdeateil from "./Prodectdeateil";
import UseTheme from "./UseTheme";
import Debounce from "./Debounce";
function App() {
  const [cart, setCart] = useState([]);
  const [data, setdata] = useState([]);
  const { toggeluse, themeuse } = UseTheme();
 

  const fatch = async () => {
    try {
      const result = await axios.get("https://dummyjson.com/products");
      setdata(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fatch();
  }, []);

  const updatedata = {
    products: [
      {
        id: 1,
        title: "Essence Mascara Lash Princess",
        description:
          "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects.",
        category: "beauty",
        price: 9.99,
        discountPercentage: 10.48,
        rating: 2.56,
        stock: 99,
        tags: ["beauty", "mascara"],
        brand: "Essence",
        sku: "BEA-ESS-ESS-001",
        weight: 4,
        dimensions: { width: 15.14, height: 13.08, depth: 22.99 },
        warrantyInformation: "1 week warranty",
        shippingInformation: "Ships in 3-5 business days",
        availabilityStatus: "In Stock",
        reviews: [
          {
            rating: 3,
            comment: "Would not recommend!",
            date: "2025-04-30T09:41:02.053Z",
            reviewerName: "Eleanor Collins",
            reviewerEmail: "eleanor.collins@x.dummyjson.com",
          },
        ],
        returnPolicy: "No return policy",
        minimumOrderQuantity: 48,
        meta: {
          createdAt: "2025-04-30T09:41:02.053Z",
          updatedAt: "2025-04-30T09:41:02.053Z",
          barcode: "5784719087687",
          qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
        },
        images: [
          "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
        ],
        thumbnail:
          "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
      },
    ],
  };

  return (
    <div>
      <BrowserRouter>
        <Header toggeluse={toggeluse} themeuse={themeuse} />
        <div>
          <Routes>
            {/* Home */}

            <Route path="/" element={<Home cart={cart} setCart={setCart} />} />

            {/* Detail Page */}
            <Route path="/Deatel" element={<Deatel />} />
            <Route path="/Otp" element={<Otp />} />

            {/* Static Pages */}
            <Route path="/about" element={<About />} />
            <Route path="/Couter" element={<Couter />} />

            {/* Protected Routes */}
            <Route path="/Com" element={<Com />} />
            <Route
              path="/Api"
              element={
                <Protect>
                  <Newapi />
                </Protect>
              }
            />

            {/* Other */}
            <Route path="/Debounce" element={<Debounce />} />
            <Route path="/Caculeter" element={<Caculeter />} />
            <Route path="/Event" element={<Event />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Test" element={<Test />} />

            {/* Dynamic Route */}
            <Route path="/products/:id" element={<Prodectdeateil />} />

            {/* Props Passing */}
            <Route path="/Demo" element={<Demo products={data.products} />} />
            <Route path="/New" element={<New objhome={updatedata} />} />
            <Route path="/Newapi" element={<Newapi />} />

            {/* 404 */}
            <Route path="*" element={<Notfound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
