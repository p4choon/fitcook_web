import { Cart } from "../Cart";
import { useContext } from "react";
import { getProductData } from "../Products";
import { FiMinusCircle } from 'react-icons/fi';


function CartProduct(props) {
  const cart = useContext(Cart);
  const id = props.id;
  const quantity = props.quantity;
  const productData = getProductData(id);

  return (
    <div>
      <h5 className="" style={{color: "purple"}}>
        {productData.name}
      </h5>
      <h6>
        Cantidad: {quantity}
      </h6>
      <p>
      {(quantity * productData.price).toFixed(2).toString().replace(".", ",").replace(/\,00/,'')}€
      </p>
      <button className="btn btn-warning" style={{ backgroundColor: 'red', fontWeight: 'bold' }} onClick={() => cart.deleteItem(id)}>
        Quitar del carrito <FiMinusCircle size={24}/>
      </button>
      <hr />
    </div>
  );
}

export default CartProduct