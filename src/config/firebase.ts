// Import the core Firebase initialization function
import { initializeApp } from "firebase/app";

// Import Firebase Authentication module for handling user authentication
import { getAuth } from "firebase/auth"; 

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
  // Sender ID for Firebase Cloud Messaging
  messagingSenderId: "691696782971",
  // Unique identifier for this specific Firebase app
  appId: "1:691696782971:web:ad2af02630eaadf43edcde"
};

// Initialize the Firebase app with our configuration
// This creates the primary Firebase app instance we'll use throughout the application
const app = initializeApp(firebaseConfig);

//print out app
console.log(app);

// Initialize Firebase Authentication and get a reference to the auth service
// This will be used for all authentication operations (sign in, sign up, etc.)
const auth = getAuth(app); 

//print out auth
console.log(auth);



