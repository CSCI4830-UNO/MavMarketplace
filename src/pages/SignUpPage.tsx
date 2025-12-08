import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/SignupPage.css"; // optional if you want styles
import { createAccount, getAuthErrorMessage } from "../services/authentication";
import { FirebaseError } from "firebase/app";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export function SignupPage() {
  // Components to be used for getting data for the backend
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Loading states and error handling values
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Used for navigation (specifcally redirects to the login page after successful signup)
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    // Frontend validation functionality for ensuring all fields are filled
    if (
      !firstName ||
      !lastName ||
      !dob ||
      !phone ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }


    // Checks that password match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Validate email domain. must be @unomaha.edu
    if (!email.toLowerCase().endsWith("@unomaha.edu")) {
      setError("Please use a valid UNO email address (@unomaha.edu)");
      return;
    }

    try {
      setLoading(true);

      // Create the Firebase Authentication account
      // This gives the user an account and a unique ID (UID)
      const userCredential = await createAccount(email, password);

      //Get the user's unique ID from Firebase Auth
      const userId = userCredential.user.uid;

      // Store additional user info in Firestore database
      // We use the UID as the document ID so we can easily find this user's data later
      await setDoc(doc(db, "users", userId), {
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dob,
        phone: phone,
        email: email,
        createdAt: new Date().toISOString(), // Track when account was created
      });

      // redirect to login page
      navigate("/login");
    } catch (err) {
      // Handle errors - Firebase specific error codes
      if (err instanceof FirebaseError) {
        setError(getAuthErrorMessage(err.code));
      } else {
        
        setError("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="signup-container">
      {/* Form to allow sign up submission functionality */}
      <form className="signup-box" onSubmit={handleSubmit}>
        <img
          src="src/assets/uno-o-icon-color.png"
          alt="Uno Logo"
          className="signup-logo"
        />
        <h2 className="signup-title">Create Account</h2>

        {error && <p className="signup-error">{error}</p>}

        {/* First Name */}
        <label className="signup-label">First Name</label>
        <input
          type="text"
          placeholder="Enter your first name"
          className="signup-input"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          disabled={loading}
        />

        {/* Last Name */}
        <label className="signup-label">Last Name</label>
        <input
          type="text"
          placeholder="Enter your last name"
          className="signup-input"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          disabled={loading}
        />

        {/* Date of Birth */}
        <label className="signup-label">Date of Birth</label>
        <input
          type="date"
          className="signup-input"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          disabled={loading}
        />

        {/* Phone Number */}
        <label className="signup-label">Phone Number</label>
        <input
          type="tel"
          placeholder="(402) 555-0123"
          className="signup-input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={loading}
        />

        {/* Email */}
        <label className="signup-label">Email</label>
        <input
          type="email"
          placeholder="user@unomaha.edu"
          className="signup-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />

        {/* Password */}
        <label className="signup-label">Password</label>
        <input
          type="password"
          placeholder="Enter a strong password"
          className="signup-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        {/* Confirm Password */}
        <label className="signup-label">Confirm Password</label>
        <input
          type="password"
          placeholder="Re-type your password"
          className="signup-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={loading}
        />

        <button type="submit" className="signup-button" disabled={loading}>
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <div className="signup-login-link">
          <Link to="/login">Already have an account? Sign in</Link>
        </div>
      </form>
    </div>
  );
}
