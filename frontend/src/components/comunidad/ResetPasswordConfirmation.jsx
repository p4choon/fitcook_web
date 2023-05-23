import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAuth, confirmPasswordReset } from 'firebase/auth';

const ResetPasswordConfirmation = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const oobCode = searchParams.get('oobCode');

  useEffect(() => {
    const auth = getAuth();

    confirmPasswordReset(auth, oobCode)
      .then(() => {
        // Contraseña restablecida correctamente
        console.log('¡Se ha restablecido la contraseña correctamente!');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Manejo de errores
        console.error('Error al restablecer la contraseña', error);
      });
  }, [oobCode]);

  return (
    <div>
      <h3>Restablecimiento de contraseña</h3>
      <p>Restableciendo la contraseña...</p>
    </div>
  );
};

export default ResetPasswordConfirmation;
