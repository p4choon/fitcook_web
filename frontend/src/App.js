import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Store from "./pages/Store";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import CartProvider from "./Cart";

function App() {
  return (
    <div>
      <CartProvider>
        <Navbar />
        
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<NotFound />} />
              <Route path="/" element={<Home />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/store" element={<Store />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/success" element={<Success />} />
              <Route path="/cancel" element={<Cancel />} />
            </Routes>
          </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;