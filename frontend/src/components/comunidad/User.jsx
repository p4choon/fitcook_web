import React, { useState } from 'react';
import { auth } from '../../firebase';
import { GoogleAuthProvider, signInWithRedirect, createUserWithEmailAndPassword } from 'firebase/auth';
import { FcGoogle } from "react-icons/fc";

const SignIn = ({ onGoogleSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailSignIn = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .catch(error => {
        // Manejar el error de registro con correo y contraseña
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Inicio de Sesión</h2>
      <form onSubmit={handleEmailSignIn}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} required />
        </label>
        <label>
          Contraseña:
          <input type="password" value={password} onChange={handlePasswordChange} required />
        </label>
        <button type="submit">Registrarse con Correo y Contraseña</button>
        <button type="button" className='btn-login' onClick={onGoogleSignIn}>
          <FcGoogle size={32} /> Iniciar Sesión con Google
        </button>
      </form>
    </div>
  );
}

export default SignIn;
