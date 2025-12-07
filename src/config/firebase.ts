//initializes firebase objects

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Firebase configuration object containing project-specific credentials and settings
//I know it looks wild but was reccommended to leave apiKey on client side
const firebaseConfig = {
  // API key for Firebase services authentication
  apiKey: "AIzaSyBBEDCaB5SH3YRcLKYRFTZvvxMEX_HRJKc",

  // Domain for Firebase Authentication UI hosting
  authDomain: "mavmarketplace-843e6.firebaseapp.com",

  // Unique identifier for your Firebase project
  projectId: "mavmarketplace-843e6",

  // URL for Firebase Cloud Storage bucket
  storageBucket: "mavmarketplace-843e6.firebasestorage.app",

  // Sender ID for Firebase Cloud Messaging (Maybe we can use this attribute)
  messagingSenderId: "691696782971", 

  // Unique identifier for this specific Firebase app
  appId: "1:691696782971:web:ad2af02630eaadf43edcde"
};

/* === initializing services === */

// Initialize the Firebase app with our configuration
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the auth service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Storage and get a reference to the service
export const storage = getStorage(app);
