import React, { useState, useEffect } from "react";
import "../styles/Loader.css";

const Loader = () => {
  const [showButton, setShowButton] = useState(true);
  useEffect(() => { 
    const timer = setTimeout(() => {
      setShowButton(false); 
    }, 2000);
 
    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="main-loader">
      <div className="cube-loader">
        <div className="cube"></div>

        {showButton && 
        <div className="loading-message">loading..</div>
        }

      </div>
    </div>
  );
};

export default Loader;
