// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { flushSync } from "react-dom";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcZXwBLeOOIdY0CXBa6bJCZxiqEU7YUC8",
  authDomain: "login-auth-fruitweb.firebaseapp.com",
  projectId: "login-auth-fruitweb",
  storageBucket: "login-auth-fruitweb.firebasestorage.app",
  messagingSenderId: "121171501975",
  appId: "1:121171501975:web:2cce2dc1c898bffd3f5ad2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
export { db };