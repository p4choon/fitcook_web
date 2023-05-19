import { Cart } from "../Cart";
import { useContext, useState } from "react";
import { FiPlus, FiMinus, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import "./plan.css";

function Plan(props) {
  const { product } = props;
  const cart = useContext(Cart);
  const quantity = cart.getQuantity(product.id);
  const [showDescription, setShowDescription] = useState(false);

  const handleClick = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="product">
      <img src={product.image} alt={product.name}/>
      <br></br>
      <div className="description">
        <p>
          <b>{product.name}</b>
        </p>
        {showDescription ? "" : <p> {product.price.toFixed(2).toString().replace(".", ",").replace(/,00/,'')}€ / 3 meses</p>}
        
        <a className="planButton" onClick={handleClick}>
          <div className="buttonPlanButton__wrapper">
            {showDescription ? (
            <span className="buttonPlanButton__text">Cerrar</span>
          ) : (
            <span className="buttonPlanButton__text">Ver más</span>
          )}
          </div>
        </a>
        <br></br>
        {showDescription && (
          <div>
            <p>
              {product.price.toFixed(2)
                .toString()
                .replace(".", ",")
                .replace(/,00/, "")}{" "}
              € / 3 meses
            </p>
            <p className="product__description">{product.description}</p>
          </div>
        )}
        {quantity > 0 ? (
          <div className="row">
            <div className="row m-auto">
              <div className="col-6">En tu carrito: {quantity}</div>
              <div className="col-6">
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => cart.addItem(product.id)}
                  style={{ backgroundColor: '#FFD700', fontWeight: 'bolder', color:'#222222', borderColor:'#FFD700' }}
                >
                  <FiPlus size={20}/>
                </button>
                <button
                  type="button"
                  className="btn btn-primary mx-2"
                  onClick={() => cart.removeItem(product.id)}
                  style={{ backgroundColor: '#222222', fontWeight: 'bolder', color:'white', borderColor:'#FFD700' }}
                >
                  <FiMinus size={20}/>
                </button>
              </div>
              <button
                type="button"
                className="btn btn-danger w-75 mt-4 m-auto"
                onClick={() => cart.deleteItem(product.id)}
                style={{ backgroundColor: '#FFFFFF', fontWeight: 'bold', color:'red', borderColor:'#222222' }}
              >
                Quitar asesoría <FiTrash2 size={20} color="red"/>
              </button>
            </div>
          </div>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => cart.addItem(product.id)}
            style={{ backgroundColor: '#222222', fontWeight: 'bold', color:'white', borderColor:'#FFD700' }}
          >
            Añadir al carrito <FiShoppingBag color="#FFD700"/>
          </button>
        )}
      </div>
    </div>
  );
}

export default Plan;
