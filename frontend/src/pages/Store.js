import { arrayProducts } from "../Products";
import Product from "../components/Product";
import "../components/product.css";

function Store() {
  return (
    <div className="container">
      <h1 className="shopTitle">Tienda de Suplementación</h1>
      <div className="row g-4 mt-2 mb-4">
        {arrayProducts.filter(product => !product.name.includes("SERVICIO")).map((product, index) => (
          <div className="col-md-4" key={index}>
            <Product product={product}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Store;
