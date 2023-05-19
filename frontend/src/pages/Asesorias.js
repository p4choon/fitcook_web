import { arrayProducts } from "../Products";
import Plan from "../components/Plan";
import "../components/product.css";

function Asesorias() {
  return (
    <div className="container">
      <h1 className="shopTitle" style={{
  textAlign: 'center',paddingBottom:'2em'}}>Asesorías</h1>
      <div className="row g-4 mt-2 mb-4">
        {arrayProducts.filter(product => product.name.startsWith("SERVICIO")).map((product, index) => (
          <div className="col-md-4" key={index}>
            <Plan product={product}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Asesorias;