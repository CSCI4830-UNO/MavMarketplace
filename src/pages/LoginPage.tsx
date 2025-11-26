/**
 * LoginPage.tsx
 *
 * This page handles user login with Firebase Authentication.
 *
 * Key concepts used:
 * - useState: React hook to store and update data (email, password, errors)
 * - useNavigate: React Router hook to redirect after login
 * - async/await: Modern way to handle Promises (like Firebase auth calls)
 * - FormEvent: TypeScript type for form submission events
 */

import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, getAuthErrorMessage } from "../services/authentication";
import { FirebaseError } from "firebase/app";
import "../css/LoginPage.css";

export function LoginPage() {
  // State for form inputs
  // useState returns [currentValue, functionToUpdateValue]
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State for error messages (shown to user when login fails)
  const [error, setError] = useState("");

  // State to disable button while logging in (prevents double-clicks)
  const [loading, setLoading] = useState(false);

  // Hook to programmatically navigate to different pages
  const navigate = useNavigate();

  /**
   * Handle form submission
   *
   * This function runs when the user clicks "Sign In"
   * It's async because we need to wait for Firebase to respond
   */
  async function handleSubmit(e: FormEvent) {
    // Prevent the default form behavior (page refresh)
    e.preventDefault();

    // Clear any previous errors
    setError("");

    // Basic validation - make sure fields aren't empty
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      // Disable the button while we're logging in
      setLoading(true);

      // Call our signIn function from authentication.ts
      // await pauses here until Firebase responds
      await signIn(email, password);

      // If we get here, login was successful!
      // Navigate to home page (or wherever you want users to go after login)
      navigate("/");
    } catch (err) {
      // Login failed - show error to user
      // We check if it's a Firebase error to get the error code
      if (err instanceof FirebaseError) {
        setError(getAuthErrorMessage(err.code));
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      // Re-enable the button whether login succeeded or failed
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      {/* Using a form element allows Enter key to submit */}
      <form className="login-box" onSubmit={handleSubmit}>
        <img
          src="src/assets/uno-o-icon-color.png"
          alt="Uno Logo"
          className="login-logo"
        />
        <h2 className="login-title">Sign In</h2>

        {/* Show error message if there is one */}
        {error && <p className="login-error">{error}</p>}

        {/* Email input
            - value={email} makes this a "controlled input" (React controls the value)
            - onChange updates state whenever user types
        */}
        <input
          type="email"
          placeholder="Email (ex. user@unomaha.edu)"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />

        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        {/* Submit button
            - type="submit" makes it trigger form onSubmit
            - disabled={loading} prevents clicking while logging in
        */}
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <div className="login-reset">
          <a href="#">Create an account</a>
          <a href="#">Forgot password?</a>
        </div>
      </form>
    </div>
  );
}
