import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
  fetchSignInMethodsForEmail,
  updateProfile,
  signOut,
  browserPopupRedirectResolver,  // Add this import
  applyActionCode, 
  checkActionCode,
} from "firebase/auth";

// Firebase Configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  // authDomain: "localhost", 
  authDomain: "nextstep-7da12.firebaseapp.com",
  projectId: "nextstep-7da12",
  storageBucket: "nextstep-7da12.appspot.com",  // Fixed storage bucket format
  messagingSenderId: "441900583840",
  appId: "1:441900583840:web:6a947cca52e7a8a2cf32c5",
  measurementId: "G-YYE4Q5XHYP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Configure Google Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { 
  auth,
  googleProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  applyActionCode,
  sendEmailVerification,
  fetchSignInMethodsForEmail,
  updateProfile,
  signOut,
  browserPopupRedirectResolver,
  checkActionCode,
};

