import React, { useState, useEffect } from 'react';
import { auth, googleProvider } from '../../firebase';
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FcGoogle } from "react-icons/fc";
import "./signin.css";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleEmailSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .catch(error => {
        console.error(error);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .catch(error => {
        console.error(error);
      });
  };

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        updateProfile(user, { displayName: name });
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });

    return () => {
      signUpButton.removeEventListener('click', () => {
        container.classList.add("right-panel-active");
      });

      signInButton.removeEventListener('click', () => {
        container.classList.remove("right-panel-active");
      });
    };
  }, []);

  return (
    <div className="containerSignIn" id="container">
      <div className="form-container sign-up-container">
        <form action="#">
          <h1>Create Account</h1>
          <div className="social-container">
            <button type="button" onClick={handleGoogleSignIn} className='btn-login' style={{width:'100%'}}><FcGoogle size={32}/>Iniciar sesión</button>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Nombre"vvalue={name} onChange={e => setName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="button" onClick={handleRegister} style={{height:'10%', width:'50%', flexGrow:0}}>Registrarse</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form action="#">
          <h1>Sign in</h1>
          <div className="social-container">
            <button type="button" onClick={handleGoogleSignIn} className='btn-login' style={{width:'100%'}}><FcGoogle size={32}/>Iniciar sesión</button>
          </div>
          <span>or use your account</span>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <a href="#">Forgot your password?</a>
          <button type="button" onClick={handleEmailSignIn} style={{height:'10%', width:'60%', flexGrow:0}}>Iniciar sesión</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" id="signIn">Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button className="ghost" id="signUp">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
