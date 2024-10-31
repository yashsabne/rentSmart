import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        {/* Left Side: About Text */}
        <div className="about-text">
          <h2 className="about-title">About RentSmart</h2>
          <p className="about-description">
            RentSmart is your ultimate solution for all property rental and listing needs. Our platform empowers renters and property owners alike, offering a streamlined and secure way to connect and interact. With a commitment to innovation, transparency, and trust, RentSmart enables users to navigate the real estate market with confidence and ease. We believe in providing a modern, technology-driven platform that transforms traditional rental processes into a seamless digital experience.
          </p>
          <p className="about-description">
            Whether you're looking to rent a home, find tenants, or list your property, RentSmart makes it easy for you to reach your goals. Our advanced search filters, smart recommendations, and intuitive design allow renters to find properties that perfectly match their preferences, while our dedicated support and resources ensure that property owners have all the tools needed to manage their listings effectively.
          </p>
        </div>
        
        {/* Right Side: Features */}
        <div className="about-features">
          <div className="about-feature">
            <h3 className="about-feature-title">Trusted Platform</h3>
            <p className="about-feature-description">
              RentSmart prioritizes user trust by implementing secure, verified processes and transparent policies. Our platform ensures that every listing and transaction adheres to high standards, providing peace of mind for renters and property owners.
            </p>
          </div>
          <div className="about-feature">
            <h3 className="about-feature-title">Seamless User Experience</h3>
            <p className="about-feature-description">
              Designed with the user in mind, RentSmart’s interface is intuitive and responsive, making property searches, listings, and communication as straightforward as possible.
            </p>
          </div>
          <div className="about-feature">
            <h3 className="about-feature-title">Comprehensive Support & Guidance</h3>
            <p className="about-feature-description">
              We offer 24/7 support and resources to help users at every step, from listing properties to navigating rental agreements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
