/**
 * ProtectedRoute.tsx
 *
 * This component acts as a "guard" for routes that require authentication.
 * It checks if the user is logged in:
 * - If YES: show the protected page
 * - If NO: redirect to the login page
 *
 * Usage in App.tsx:
 * <Route path="/create" element={<ProtectedRoute><CreatePage /></ProtectedRoute>} />
 */

import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ReactNode } from "react";

// Props type - children is the component we want to protect
interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  // Get the current user from our AuthContext
  // If user is null, they're not logged in
  const { currentUser } = useAuth();

  // If no user is logged in, redirect to login page
  // Navigate is React Router's way of redirecting
  // replace={true} means this won't add to browser history
  // (so clicking "back" won't bring them back to this protected page)
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // User is logged in, show the protected content
  // We cast children to JSX.Element because Navigate returns that type
  return <>{children}</>;
}
