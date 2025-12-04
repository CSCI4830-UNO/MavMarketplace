import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/SignupPage.css"; // optional if you want styles

export function SignupPage() {
  // Components to be used for getting data for the backend
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
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

    try {
      setLoading(true);

      // TODO: Replace this with actual backend signup logic
      // await createAccount(email, password, firstName, lastName, dob);

      // TEMPORARY dummy delay so the UI behaves like the login page
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Redirect back to login page once signup completes
      navigate("/login");
    } catch (err) {
      setError("Signup failed. Please try again.");
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
