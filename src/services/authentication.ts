//authentication services for users

import { createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut,onAuthStateChanged } from "firebase/auth";

import { auth } from "../config/firebase";

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
4. Auth state changed
-----------------------
if user is logged in or not.

onAuthStateChanged(auth, (user) => {
    if (user) {
        showLoggedInView()
        showProfilePicture(userProfilePictureEl, user)
        showUserGreeting(userGreetingEl, user)
    } else {
        showLoggedOutView()
    }
})
*/
