import React, { useState } from 'react';
import '../styles/ForgetPass.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const backendUrl = process.env.REACT_APP_BASE_BACKEND_URL;


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    if (!email) {
      setError('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Password reset link sent! Please check your email.');
      } else {
        setError(data.message || 'Failed to send reset link.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reset-forgot-password-page">
      <h2>Forgot Password</h2>
      <p className='reset-info-page' >Enter your email to receive a password reset link.</p>
      <form onSubmit={handleSubmit} className='reset-form' >
        <input className='reset-form-input'
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" disabled={isLoading} className='reset-form-btn'>
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
      {message && <p className="reset-success-message">{message}</p>}
      {error && <p className="reset-error-message">{error}</p>}
    </div>
  );
};

export default ForgotPassword;
