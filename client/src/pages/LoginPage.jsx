import React, { useState } from "react";
import "../styles/Login.css";
import { setLogin } from "../redux/state";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
 
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

 
  const backendUrl = process.env.REACT_APP_BASE_BACKEND_URL;
  
  const handleSubmit = async (e) => {
    e.preventDefault();

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
        navigate("/dashboard"); // Redirect after successful login
      } else {
        const errorData = await response.json();
        setError(errorData.message); // Display backend error message
      }
    } catch (err) {
      console.log("Login failed", err.message);
      setError("Something went wrong. Please try again."); // Generic error message
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>
        {error && <div className="error-message">{error}</div>} {/* Display error message */}

        <div className="login-content">
          <form className="login-content-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">LOG IN</button>
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
            <a href="/forgot-password">Forgot Password?</a>
            <a href="/register">Don't have an account? Sign Up Here</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
