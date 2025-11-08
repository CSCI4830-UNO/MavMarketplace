import { initializeApp } from "firebase/app";

import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

import firebase from "firebase/compat/app";


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

// Initialize the Firebase app with our configuration
// This creates the primary Firebase app instance we'll use throughout the application
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the auth service
// This will be used for all authentication operations (sign in, sign up, etc.)
const auth = getAuth(app); 

/*
Authentication Function Templates
These functions will be connected to our React components later.
They handle the core Firebase authentication operations.

1. Sign In Function
-------------------
This function will handle user login with email/password.
Will be connected to the login form component.

function authSignInWithEmail() {
    console.log("Sign in with email and password")

    // Will get these values from React form inputs later
    const email = emailInputEl.value
    const password = passwordInputEl.value

    signInWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {
            // Handle successful sign in
            // Will update UI state in React
            clearAuthFields()
            showLoggedInView()
        })
        .catch((error) => { 
            // Handle sign in errors
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
        });
}

/*
2. Account Creation Function
--------------------------
Handles new user registration
Will need to add UNO email validation
Will add email verification later

function authCreateAccountWithEmail() {
    // Will get these values from React form inputs later
    const email = emailInputEl.value
    const password = passwordInputEl.value

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Handle successful account creation
            clearAuthFields()
            console.log("Account Created!")
            showLoggedInView()
        })
        .catch((error) => {
            // Handle registration errors
            const errorCode = error.code
            const errorMessage = error.message
            console.log("ERROR")
        })
}

/*
3. Sign Out Function
------------------
Handles user logout
Will be connected to navigation/header component

function authSignOut() {
    signOut(auth).then(() => {
        // Handle successful sign out
        showLoggedOutView()
    }).catch((error) => {
        // Handle sign out errors
        console.error(error.message)
    });
}
*/





