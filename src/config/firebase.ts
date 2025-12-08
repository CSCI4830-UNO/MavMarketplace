//initializes firebase objects

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Firebase configuration object containing project-specific credentials and settings
//I know it looks wild but was reccommended to leave apiKey on client side
const firebaseConfig = {
  apiKey: "AIzaSyBBEDCaB5SH3YRcLKYRFTZvvxMEX_HRJKc",
  authDomain: "mavmarketplace-843e6.firebaseapp.com",
  projectId: "mavmarketplace-843e6",
  storageBucket: "mavmarketplace-843e6.firebasestorage.app",
  messagingSenderId: "691696782971", 
  appId: "1:691696782971:web:ad2af02630eaadf43edcde"
};

// Initialize the Firebase app with our configuration
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

// Initialize Firebase Storage and get a reference to the service
export const storage = getStorage(app);
