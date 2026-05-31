import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './About'
import Home from './Home'
import Header from './Header'
import Signup from "./Signup";
import Login from "./Login";
import Dimention from "./Dimention";
import Review from './Review'
import Tag from './Tag'
import Title from './Title';
function App() {
 

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/About" element={<About />}></Route>
          <Route path="/Header" element={<Header />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Title" element={<Title />}></Route>
          <Route path="/Tag" element={<Tag />}></Route>
          <Route path="/Dimention" element={<Dimention />}></Route>
          <Route path="/Review" element={<Review />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
