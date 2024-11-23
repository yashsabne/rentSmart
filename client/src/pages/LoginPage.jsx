import React, { useState } from "react";
import "../styles/Login.css";
import { setLogin } from "../redux/state";
import { useDispatch } from "react-redux";
import { useNavigate,Link } from "react-router-dom"; 

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const backendUrl = process.env.REACT_APP_BASE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the login starts

    try {
      const response = await fetch(`${backendUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const loggedIn = await response.json();
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        setLoading(false); // Stop loading after successful login
        navigate("/dashboard"); // Redirect after successful login
      } else {
        const errorData = await response.json();
        setError(errorData.message); // Display backend error message
        setLoading(false); // Stop loading on error
      }
    } catch (err) {
      console.log("Login failed", err.message);
      setError("Something went wrong. Please try again."); // Generic error message
      setLoading(false); // Stop loading on error
    }
  };

  return (
    <div className="login-container">
    <div className="login-box">
      <h2>Welcome Back</h2>
      {error && <div className="error-message">{error}</div>}

      <div className="login-content">
        <form className="login-content-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Login Processing..." : "LOG IN"}
          </button>
        </form>

        <div className="google-login" role="button" aria-disabled="true">
          <img
            src="assets/googlelogo.jpg"
            alt="Google"
            style={{ borderRadius: "50%" }}
          />
          <span>Login with Google</span>
          <span className="google-prob">
            Temporary Google login is having issues
          </span>
        </div>
        <div className="login-links">
          <Link to="/forgot-password">Forgot Password?</Link>
          <Link to="/register">Don't have an account? Sign Up Here</Link>
        </div>
      </div>
    </div>
  </div>
  );
};

export default LoginPage;
