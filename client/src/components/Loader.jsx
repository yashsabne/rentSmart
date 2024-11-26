import React, { useState, useEffect } from "react";
import "../styles/Loader.css";

const Loader = () => {
  const [showButton, setShowButton] = useState(true);
  useEffect(() => { 
    const timer = setTimeout(() => {
      setShowButton(false); 
    }, 4000);
 
    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="main-loader">
      <div className="cube-loader">
        <div className="cube"></div>

        {showButton && 
        <div className="loading-message">loading, you may need to wait because of free M0 database..</div>
        }

      </div>
    </div>
  );
};

export default Loader;
