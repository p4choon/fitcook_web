import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import './cancel.css';

function Cancel() {
  return (
    <div className="cancel-container">
      <div className="cancel-content">
        <FiShoppingBag className="cancel-icon" />
        <h1 className="cancel-title">Vaya... Has cancelado la compra 😢</h1>
        <p className="cancel-message">¡No te desanimes! Explora nuestra tienda y descubre nuevos productos.</p>
        <Link to="/store" className="btn cancel-button">
          Volver a la Tienda
        </Link>
      </div>
    </div>
  );
}

export default Cancel;
