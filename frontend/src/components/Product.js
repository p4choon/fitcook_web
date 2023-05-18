import { Cart } from "../Cart";
import { useContext } from "react";
import { FiPlus, FiMinus, FiTrash2, FiShoppingBag } from 'react-icons/fi';

function Product(props) {
  const { product } = props;
  const cart = useContext(Cart);
  const quantity = cart.getQuantity(product.id);

  return (
    <div className="product">
      <img src={product.image} alt={product.name}/>
      <div className="description">
        <p>
          <b>{product.name}</b>
        </p>
        <p> {product.price.toLocaleString('es-ES')}€</p>
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
                Quitar producto <FiTrash2 size={20} color="red"/>
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

export default Product;
