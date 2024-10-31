import "../styles/button.css";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
const Button = ( {name, isBeam = false}) => {
  useGSAP(() => {
    gsap.fromTo(
      ".btn", 
      {
        opacity: 0,
        y: -window.innerHeight,   
      }, 
      {
        opacity: 1,
        y: 0,
        delay: 1.5,
        ease: "bounce.out",  
        duration: 2,        
      }
    );
  }, []);

    return (
      <button className='btn'>
        {isBeam && (
          <span >
            <span className="btn-ping"></span>
            <span className="btn-ping_dot"></span>
          </span>
        )}
        {name}
      </button>
    );
  };
  
  export default Button;
 