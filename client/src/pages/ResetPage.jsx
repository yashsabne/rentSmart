import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ResetPassword.css';

const ResetPassword = () => {
  const backendUrl = process.env.REACT_APP_BASE_BACKEND_URL;


  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backendUrl}/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });
      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset successful. Redirecting to login...");
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setMessage(data.message || "Failed to reset password");
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="reset-container">
      <h2 className="reset-title">Reset Password</h2>
      {message && <p className="reset-message">{message}</p>}
      <form className="reset-form" onSubmit={handleSubmit}>
        <input
          className="reset-input"
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button className="reset-button" type="submit">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
