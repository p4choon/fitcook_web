import React, { useState, useEffect } from 'react';
// import Link from 'link';
import { BsBagCheckFill } from 'react-icons/bs';
import { runFireworks } from '../lib/utils';
import "./success.css";

function Success() {
  
  useEffect(() => {
    localStorage.clear();
    runFireworks();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Gracias por tu compra!</h2>
        <p className="email-msg">Ya te ha llegado el recibo en el correo proporcionado.</p>
        <p className="description">
          If you have any questions, please email
          <a className="email" href="mailto:contact@fitcook.com">
            contact@fitcook.com
          </a>
        </p>
        <a href="/">
          <button type="button" width="300px" className="btnSuccess">
            Continua Navegando
          </button>
        </a>
      </div>
    </div>
  )
}

export default Success