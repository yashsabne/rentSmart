import React, { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import HeroHome from "../ModelThreeD/HeroHome";
import HeroCamera from "../ModelThreeD/HeroCamera";
import CanvasLoader from "../ModelThreeD/CanvasLoader";
import "../styles/Slide.css";
import gsap from "gsap";
import Button from "./Button";

const Slide = () => {
  const user = useSelector((state) => state.user);
  const userName = user?.firstName || "Guest";

  // GSAP Animation for heading
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".slide-heading",
      {
        opacity: 0,
        z: 0,
      },
      {
        opacity: 1,
        y: 50,
        ease: "bounce.out",
        duration: 2,
      }
    )
      .to(".slide-heading", {
        opacity: 1,  // Keep fully visible
        duration: 1, // Hold the visibility for 1 second
      })
      .to(".slide-heading", {
        opacity: 0,  // Fade out
        y: -100,      // Move upward out of view
        ease: "power2.in", // Ease for upward movement
        duration: 1.5, // Duration of the fade-out and upward movement
      });
  }, []);


  return (
    <div className="slide">
      {/* Background 3D Canvas */}
      <div className="canvas-background">
        <Canvas className="threedModel">
          <Suspense fallback={<CanvasLoader />}>
            <PerspectiveCamera makeDefault position={[0, 0, 20]} />
            <HeroCamera>
              <HeroHome scale={0.5} />
            </HeroCamera>
            <ambientLight intensity={0.9} color={"#82bce0"} />  
            <directionalLight
              intensity={1}
              position={[5, 10, 5]}
              color={"#ffffff"}
              castShadow
            />

          </Suspense>
        </Canvas>
      </div>

      {/* Content Section */}
      <div className="content">
        <div className="welcome-section">
          <h1 className="slide-heading">
            Welcome, {userName}!
            <br />
            Thank you for choosing RentSmart!
          </h1>
        </div>

        <div className="info-section">
          <p className="slide-info">
            We are committed to providing the best rental services and ensuring a smooth and smart experience for all your needs. Explore our features, and feel free to reach out for any assistance!
          </p>
          <a
            href="#explore">
            <Button name="Explore Rent Smart" isBeam />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Slide;
