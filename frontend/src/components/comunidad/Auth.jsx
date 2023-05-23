import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import SignIn from "./SignIn";
import LogOut from "./LogOut";
import ResetPasswordConfirmation from './ResetPasswordConfirmation';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [showResetPasswordConfirmation, setShowResetPasswordConfirmation] = useState(false);

  const handleResetPassword = (e) => {
    e.preventDefault();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Restablecimiento de contraseña exitoso
        console.log('Se ha enviado un correo electrónico para restablecer la contraseña');
        setShowResetPasswordConfirmation(true);
      })
      .catch((error) => {
        // Manejo de errores
        console.error('Error al enviar el correo electrónico para restablecer la contraseña', error);
      });
  };

  const [user] = useAuthState(auth);

  if (user) {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-around', margin: '2em 0em' }}>
          <h3>Configuración de Perfil</h3>
          <LogOut style={{ display: 'flex', right: 0 }} />
        </div>
        {showResetPasswordConfirmation ? (
          <ResetPasswordConfirmation />
        ) : (
          <form onSubmit={handleResetPassword}>
            <label>
              Cambiar Correo electrónico:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <button type="submit">Restablecer Contraseña</button>
          </form>
        )}
      </div>
    );
  }

  return <SignIn />;
};

export default Auth;
