// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "dbms-hospital-52d1f.firebaseapp.com",
  projectId: "dbms-hospital-52d1f",
  storageBucket: "dbms-hospital-52d1f.appspot.com",
  messagingSenderId: "249308890585",
  appId: "1:249308890585:web:3bbf05b33530dc2b51c5c8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
