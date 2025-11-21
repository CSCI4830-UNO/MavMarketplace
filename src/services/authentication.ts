/**
 * authentication.ts
 *
 * This file contains all the Firebase authentication functions.
 * These functions are called from React components (like LoginPage).
 *
 * Each function returns a Promise, which means:
 * - We can use .then() and .catch() to handle success/errors
 * - Or we can use async/await syntax
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../config/firebase";

/**
 * Sign In Function
 *
 * Logs in an existing user with email and password.
 * Returns a Promise that resolves with the user credential on success.
 *
 * @param email - User's email address
 * @param password - User's password
 * @returns Promise with UserCredential on success
 *
 * Usage in a component:
 * try {
 *   await signIn(email, password);
 *   // redirect to home or show success
 * } catch (error) {
 *   // show error message to user
 * }
 */
export function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

/**
 * Create Account Function
 *
 * Creates a new user account with email and password.
 * Returns a Promise that resolves with the user credential on success.
 *
 * @param email - User's email address (should be @unomaha.edu)
 * @param password - User's chosen password
 * @returns Promise with UserCredential on success
 *
 * TODO: Add UNO email validation (@unomaha.edu)
 * TODO: Add email verification
 */
export function createAccount(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

/**
 * Sign Out Function
 *
 * Logs out the current user.
 * Returns a Promise that resolves when sign out is complete.
 *
 * Usage:
 * await logOut();
 * // user is now logged out
 */
export function logOut() {
  return signOut(auth);
}

/**
 * Error Message Helper
 *
 * Converts Firebase error codes into user-friendly messages.
 * Firebase errors are technical (like "auth/wrong-password"),
 * so we translate them to something users can understand.
 *
 * @param errorCode - The Firebase error code
 * @returns A user-friendly error message
 */
export function getAuthErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case "auth/invalid-email":
      return "Invalid email address format.";
    case "auth/user-disabled":
      return "This account has been disabled.";
    case "auth/user-not-found":
      return "No account found with this email.";
    case "auth/wrong-password":
      return "Incorrect password.";
    case "auth/invalid-credential":
      return "Invalid email or password.";
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again later.";
    default:
      return "An error occurred. Please try again.";
  }
}
