// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Import Firebase Authentication to enable user sign-in and authentication features
import { getAuth } from "firebase/auth"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBEDCaB5SH3YRcLKYRFTZvvxMEX_HRJKc",
  authDomain: "mavmarketplace-843e6.firebaseapp.com",
  projectId: "mavmarketplace-843e6",
  storageBucket: "mavmarketplace-843e6.firebasestorage.app",
  messagingSenderId: "691696782971",
  appId: "1:691696782971:web:ad2af02630eaadf43edcde"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app); 



