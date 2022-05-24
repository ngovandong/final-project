// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCT8R-4RZzLxGqgmWvxxqdLQXNrjx_jhuY",
  authDomain: "mobile-bb4d8.firebaseapp.com",
  projectId: "mobile-bb4d8",
  storageBucket: "mobile-bb4d8.appspot.com",
  messagingSenderId: "1054101004476",
  appId: "1:1054101004476:web:ef647f296965bf6855b0b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
