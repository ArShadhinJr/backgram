// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnW9DxE7ZAaeYES8FrXFqVxXDj9FDzePc",
  authDomain: "backgram-71e9b.firebaseapp.com",
  projectId: "backgram-71e9b",
  storageBucket: "backgram-71e9b.appspot.com",
  messagingSenderId: "980271994645",
  appId: "1:980271994645:web:e7d1f118f9e4e881defb1c"
};

// Initialize Firebase
const app = initializeApp( firebaseConfig );
export default firebaseConfig; 