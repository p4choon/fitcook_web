import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA6LkoJlLgd-_g2ajWqUIr9OiBfoNYv2kg",
  authDomain: "fitcook-90894.firebaseapp.com",
  projectId: "fitcook-90894",
  storageBucket: "fitcook-90894.appspot.com",
  messagingSenderId: "687609825192",
  appId: "1:687609825192:web:b543d417a65363e5387f9d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };
