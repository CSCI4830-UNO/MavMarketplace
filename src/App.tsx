/**
 * - AuthProvider: Wraps app to provide auth state to all components
 * - Routes: Defines which pages are shown for each URL
 * - ProtectedRoute: Guards routes that require authentication
 *
 * Route Protection:
 * - Public routes: /, /listings, /help, /login
 * - Protected routes: /create, /me/listings, /messages, /profile
 */

import "./css/App.css";
import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { ListingPage } from "./pages/ListingPage";
import { CreatePage } from "./pages/CreatePage";
import { MyListingPage } from "./pages/MyListingPage";
import { MessagePage } from "./pages/MessagePage";
import { ProfilePage } from "./pages/ProfilePage";
import { HelpPage } from "./pages/HelpPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignUpPage";

// Import auth components
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Dashboard />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/listings" element={<ListingPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/me/listings"
            element={
              <ProtectedRoute>
                <MyListingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <MessagePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
