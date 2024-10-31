import React, { useState } from "react";
import "../styles/Login.css"
import { setLogin } from "../redux/state";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const backendUrl = process.env.REACT_APP_BASE_BACKEND_URL;
 

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch (`${backendUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })
 
      const loggedIn = await response.json()

      if (loggedIn) {
        dispatch (
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token
          })
        )
        navigate("/")
      }

    } catch (err) {
      console.log("Login failed", err.message)
    }
  }

  return (
<div className="login-container">
  <div className="login-box">
    <h2>Welcome Back</h2>
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
      
      <div className="google-login">
        <img src="assets/googlelogo.jpg" alt="Google" style={{borderRadius:'50%' }} />
        <span>Login with Google</span>
      </div>
      {/*  onClick={handleGoogleLogin} */}

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
