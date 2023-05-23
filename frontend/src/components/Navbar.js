import React, { useContext, useState } from "react";
import { Cart } from "../Cart";
import CartProduct from "../components/CartProduct";
import "./navbar.css";
import logo from "../assets/LogoFitCook.PNG";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { FaBars } from 'react-icons/fa';

function Navbar() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleMobileNavToggle = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const cart = useContext(Cart);
  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );
  const [currentRoute, setCurrentRoute] = useState("");

  const handleRouteChange = (route) => {
    setCurrentRoute(route);
  };

  const checkout = async () => {
    await fetch("http://localhost:4000/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cart.items }),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((response) => {
        console.log(response.url);
        if (response.url) {
          window.location.assign(response.url);
        }
      });
  };

  return (
    <div className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a
          className={`navbar-brand ${
            currentRoute === "/" ? "active" : ""
          }`}
          href="./"
          onClick={() => handleRouteChange("/")}
        >
          <img src={logo} width={300} alt="Logo FitCook" />
        </a>
        <div className={`navbar-toggle ${isMobileNavOpen ? 'active' : ''}`} onClick={handleMobileNavToggle}>
          <FaBars />
        </div>
        
        <ul className={`navbar-menu ${isMobileNavOpen ? 'active' : ''}`}>
          <ul className="navbar-nav ms-auto">
            <a
              className={`nav-link ${
                currentRoute === "/recetas" ? "active" : ""
              }`}
              href="./recetas"
              onClick={() => handleRouteChange("/recetas")}
            >
              Recetas
            </a>
            <a
              className={`nav-link ${
                currentRoute === "/creatudieta" ? "active" : ""
              }`}
              href="./creatudieta"
              onClick={() => handleRouteChange("/creatudieta")}
            >
              Crea tu Dieta
            </a>
            <a
              className={`nav-link ${
                currentRoute === "/calculadoraimc" ? "active" : ""
              }`}
              href="./calculadoraimc"
              onClick={() => handleRouteChange("/calculadoraimc")}
            >
              Calculadora IMC
            </a>
            <a
              className={`nav-link ${
                currentRoute === "/asesorias" ? "active" : ""
              }`}
              href="./asesorias"
              onClick={() => handleRouteChange("/asesorias")}
            >
              Asesorías
            </a>
            <a
              className={`nav-link ${
                currentRoute === "/comunidad" ? "active" : ""
              }`}
              href="./comunidad"
              onClick={() => handleRouteChange("/comunidad")}
            >
              Comunidad
            </a>
            <a
              className={`nav-link ${
                currentRoute === "/store" ? "active" : ""
              }`}
              href="./store"
              onClick={() => handleRouteChange("/store")}
            >
              Tienda
            </a>
            <a
              className={`nav-link ${
                currentRoute === "/aboutus" ? "active" : ""
              }`}
              href="./aboutus"
              onClick={() => handleRouteChange("/aboutus")}
            >
              Sobre Nosotros
            </a>
            <a
              className={`nav-link ${
                currentRoute === "/contact" ? "active" : ""
              }`}
              href="./contact"
              onClick={() => handleRouteChange("/contact")}
            >
              Contacto
            </a>
            <a
              className={`nav-link ${
                currentRoute === "/login" ? "active" : ""
              }`}
              href="./login"
              onClick={() => handleRouteChange("/login")}
            >
              <FiUser size={25}/>
            </a>
            <button
              type="button"
              className="btn btn-dark"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              style={{ backgroundColor: "#222222" }}
            >
              <FiShoppingCart size={27} />
              {productsCount > 0 && (
                <span className="numero-items">{productsCount}</span>
              )}
            </button>
            
            <div
              className="modal fade"
              id="exampleModal"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header bg-dark text-white">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      Tu carrito<FiShoppingCart size={25} />
                    </h1>
                    <button
                      type="button"
                      className="btn-close btn-close-white"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    {productsCount > 0 ? (
                      <div>
                        {cart.items.map((product, index) => (
                          <CartProduct
                            id={product.id}
                            quantity={product.quantity}
                            key={index}
                          />
                        ))}

                        <h4>
                          Total:{" "}
                          {cart
                            .getTotal()
                            .toFixed(2)
                            .toString()
                            .replace(".", ",")
                            .replace(/,00/, "")}
                          €
                        </h4>
                      </div>
                    ) : (
                      <h4 className="text-danger">Tu carrito está vacío 😪</h4>
                    )}
                  </div>
                  <div className="modal-footer">
                    {productsCount > 0 ? (
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={checkout}
                        style={{
                          backgroundColor: "#FFD700",
                          fontWeight: "bold",
                          color: "#222222",
                          borderColor: "#222222",
                        }}
                      >
                        Comprar
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Volver
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ul>
        </ul>
      </div>
    </div>    
  );
}

export default Navbar;
