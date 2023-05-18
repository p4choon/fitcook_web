import { useContext } from "react";
import { Cart } from "../Cart";
import CartProduct from "../components/CartProduct";
import { ShoppingCart } from "phosphor-react";
import "./navbar.css"
import logo from "../assets/LogoFitCook.PNG";
import { FiShoppingCart } from 'react-icons/fi';

function Navbar() {
  const cart = useContext(Cart);
  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

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
        <a className="navbar-brand" href="/">
          <img src={logo} width={300}/>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
          <button
              type="button"
              className="btn btn-dark"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              style={{ backgroundColor: '#222222' }}
            ><FiShoppingCart size={27} />
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
                            .replace(/\,00/, "")}
                          €
                        </h4>
                      </div>
                    ) : (
                      <h4 className="text-danger">El carrito está vacío</h4>
                    )}
                  </div>
                  <div className="modal-footer">
                    {productsCount > 0 ? (
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={checkout}
                        style={{ backgroundColor: '#FFD700', fontWeight: 'bold', color:'#222222', borderColor:'#222222' }}
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
        </div>
      </div>
    </div>
  );
}

export default Navbar;
