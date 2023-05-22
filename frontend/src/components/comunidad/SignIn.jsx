import { auth } from '../../firebase';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  }

  return (
    <>
      <button 
        className='btn-login' 
        onClick={googleSignIn}
        // style={{backgroundColor:'white'}}
      >
        <FcGoogle size={32}/>
        Sign in with Google
      </button>
    </>
  );
}
 
export default SignIn;