import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Store from "./pages/Store";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Home from "./pages/Home";
import Rutinas from "./pages/Rutinas";
import Recetas from "./pages/Recetas";
import CreaTuDieta from "./pages/CreaTuDieta";
import CalculadoraIMC from "./pages/CalculadoraIMC";
import Asesorias from "./pages/Asesorias";
import Comunidad from "./pages/Comunidad";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
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
              <Route path="/rutinas" element={<Rutinas />} />
              <Route path="/recetas" element={<Recetas />} />
              <Route path="/creatudieta" element={<CreaTuDieta />} />
              <Route path="/calculadoraimc" element={<CalculadoraIMC />} />
              <Route path="/asesorias" element={<Asesorias />} />
              <Route path="/comunidad" element={<Comunidad />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/store" element={<Store />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/success" element={<Success />} />
              <Route path="/cancel" element={<Cancel />} />
            </Routes>
          </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
