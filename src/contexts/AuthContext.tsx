/**
 * AuthContext.tsx
 *
 * This file creates a "Context" - React's way of sharing data across all components
 * without having to pass props down through every level.
 *
 * Think of it like a global variable that any component can access.
 * Here we're sharing: the current user (or null if logged out)
 */

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

// Define what data our context will provide to components
// This is TypeScript - it helps catch errors before running the code
interface AuthContextType {
  currentUser: User | null;  // The logged-in user, or null if not logged in
  loading: boolean;          // True while we're checking if user is logged in
}

// Create the context with default values
// This is like creating an empty container that we'll fill with real data
const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
});

// Custom hook - a shortcut for components to access our auth data
// Instead of writing useContext(AuthContext), components can just write useAuth()
export function useAuth() {
  return useContext(AuthContext);
}

// Props type for AuthProvider component
interface AuthProviderProps {
  children: ReactNode;  // The components that will be wrapped by AuthProvider
}

/**
 * AuthProvider Component
 *
 * This wraps your entire app and provides auth state to all child components.
 * It listens for Firebase auth changes (login/logout) and updates the state.
 *
 * Usage in App.tsx:
 * <AuthProvider>
 *   <YourApp />
 * </AuthProvider>
 */
export function AuthProvider({ children }: AuthProviderProps) {
  // State to store the current user (null if not logged in)
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // State to track if we're still checking auth status
  // Important: we don't want to redirect to login before we know if user is logged in!
  const [loading, setLoading] = useState(true);

  // useEffect runs when component mounts (when app starts)
  // This sets up a "listener" that watches for auth changes
  useEffect(() => {
    // onAuthStateChanged is a Firebase function that:
    // - Fires immediately with current auth state
    // - Fires again whenever user logs in or out
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Update our state with the user (or null)
      setCurrentUser(user);
      // We're done loading - we now know if user is logged in or not
      setLoading(false);
    });

    // Cleanup function - runs when component unmounts
    // This stops listening for auth changes (prevents memory leaks)
    return unsubscribe;
  }, []); // Empty array means this only runs once when component mounts

  // The value that will be available to all child components
  const value = {
    currentUser,
    loading,
  };

  // Provide the auth data to all children
  // We don't render children until loading is false to prevent flicker
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}