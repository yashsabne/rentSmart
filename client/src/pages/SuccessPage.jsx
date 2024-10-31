import React from "react";
import "../styles/SuccessPage.css"; // Importing the CSS for styling

const SuccessPage = () => {
  return (
    <div className="success-page">
      <div className="success-container">
        <div className="icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="check-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h1 className="success-title">Listing Successful!</h1>
        <p className="success-message">
          Your listing has been created successfully. You can now view or manage it from your dashboard.
        </p>
        <div className="button-container">
            <a href="/">
          <button className="success-btn">Homepage</button>
          </a>
          <a href="/dashboard"> 
          <button className="dashboard-btn">Go to Dashboard</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
