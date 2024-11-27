import React, { useState, useEffect } from "react";
import "../styles/Loader.css";

const Loader = () => {
  const [showButton, setShowButton] = useState(true);
  const [showCube,setShowCube] = useState(false)
  useEffect(() => { 
    const timer = setTimeout(() => {
      setShowButton(false); 
    }, 2000);
 
    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="main-loader">
      <div className="cube-loader">

      {showCube && 

        <div className="cube"></div>

      }

      </div>
      {showButton && 
        <div className="loading-message">Using a free database version, please wait a moment for it to load.</div>
      }
    </div>
  );
};

export default Loader;
