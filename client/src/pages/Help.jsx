import React from 'react';
import '../styles/HelpAboutPage.css';

const HelpAboutPage = () => {
    return (
        <div class="page-container">
        
        <section class="help-section">
            <h1 class="main-heading">Help & Support</h1>
            <p class="help-intro">
                Need assistance? Explore our help topics or contact our support team for guidance on using RentSmart effectively.
            </p>
    
            <div class="help-topics">
                <div class="help-topic">
                    <h3 class="help-title">Getting Started</h3>
                    <p class="help-description">
                        Sign up and complete your profile to access our listings and connect with potential tenants or landlords.
                    </p>
                </div>
    
                <div class="help-topic">
                    <h3 class="help-title">Managing Listings</h3>
                    <p class="help-description">
                        Edit and update your properties through your dashboard. Accurate details improve visibility and user trust.
                    </p>
                </div>
    
                <div class="help-topic">
                    <h3 class="help-title">Premium Membership</h3>
                    <p class="help-description">
                        Upgrade to Premium for exclusive features like enhanced visibility, analytics, and priority support.
                    </p>
                </div>
    
                <div class="help-topic">
                    <h3 class="help-title">Sponsored Listings</h3>
                    <p class="help-description">
                        Boost your reach with sponsored listings, which appear at the top of search results for greater exposure.
                    </p>
                </div>
    
                <div class="help-topic">
                    <h3 class="help-title">Contact Support</h3>
                    <p class="help-description">
                        For additional assistance, reach us at <a href="mailto:yashsabne39@gmail.com">yashsabne39@gmail.com</a>.
                    </p>
                </div>
            </div>
        </section> 
        <section class="info-section">
            <h2 class="sub-heading">About RentSmart</h2>
            <p class="info-content">
                RentSmart is a comprehensive platform designed to simplify the rental process for landlords and tenants alike. Our platform provides an intuitive interface for finding and managing properties with ease.
            </p>
    
            <h3 class="feature-heading">Premium Features</h3>
            <p class="feature-content">
                With Premium, users access benefits such as enhanced listings, performance insights, and direct support for optimized rental management.
            </p>
    
            <h3 class="feature-heading">Sponsor Options</h3>
            <p class="feature-content">
                Increase your listing’s visibility with sponsorship options that place your properties at the top of search results, giving you an edge in attracting more tenants.
            </p>

            <h1 style={{textAlign:'center',textDecoration:'underline',marginBottom:'20px'}} >For Project viewer</h1>

            <div class="project-description">
    <h3>Project Title: RentSmart - A Rental Management System</h3>
    
    <h3>Project Overview:</h3>
    <p>RentSmart is an innovative rental management platform that aims to provide a seamless experience for both property owners and tenants. The platform connects property owners with prospective renters, streamlining the rental process through an easy-to-use, efficient system. With features for property listing, tenant management, lease tracking, payment processing, and more, RentSmart aims to become the go-to solution for property rentals.</p>
    
    <h3>Objective:</h3>
    <p>The primary objective of the RentSmart project is to create a platform that simplifies the rental process for both landlords and tenants. It enables property owners to manage their listings, while tenants can easily find rental properties and manage their rental payments, all in one place. The platform also supports advanced features such as:</p>
    <ul>
        <li>Secure user authentication (via email or Google login).</li>
        <li>Real-time chat for communication between tenants and landlords.</li>
        <li>Integration with payment systems for rent payments.</li>
        <li>Property search and advanced filtering options.</li>
        <li>Dashboard to manage personal details, property listings, and saved properties.</li>
    </ul>

    <h3>Technology Stack:</h3>
    <p>The RentSmart application is built using the following technologies:</p>
    <ul>
        <li><strong>Frontend:</strong>
            <ul>
                <li>React.js: A JavaScript library used for building the user interface, providing a dynamic and responsive experience.</li>
                <li>HTML, CSS, JavaScript: Core web technologies used for layout, styling, and client-side functionality.</li>
                <li>Three Js: for 3D modeling</li>
         
            </ul>
        </li>
        <li><strong>Backend:</strong>
            <ul>
                <li>Node.js: JavaScript runtime environment for the server-side of the application.</li>
                <li>Express.js: A web application framework for Node.js to handle routing and middleware.</li>
                <li>MongoDB: A NoSQL database to store user data, property listings, transaction history, and other related information.</li>
                <li>Mongoose: ODM (Object Data Modeling) library for MongoDB, providing a way to model and query data.</li>
            </ul>
        </li>
        <li><strong>Authentication:</strong>
            <ul>
                <li>JWT (JSON Web Tokens): For handling secure user authentication and authorization.</li>
                <li>Google OAuth: For providing an option to log in with Google.</li>
            </ul>
        </li>
        <li><strong>Payment Integration:</strong>
            <ul>
                <li>Razorpay: Integrated to handle online payments for rent transactions.</li>
            </ul>
        </li>
        <li><strong>Real-Time Communication:</strong>
            <ul>
                <li>Socket.IO: For enabling real-time chat between property owners and tenants.</li>
            </ul>
        </li>
        <li><strong>Hosting/Deployment:</strong>
            <ul>
                <li>Vercel and render: Used to host the application and deploy both frontend and backend.</li>
                <li>MongoDB Atlas: For cloud-based database management.</li>
            </ul>
        </li>
    </ul>

    <h3>Features:</h3>
    <ul>
        <li><strong>User Registration and Authentication:</strong> Users can register and log in via email or Google OAuth for quick and secure access. Passwords are securely hashed using bcrypt to ensure data security.</li>
        <li><strong>User Dashboard:</strong> After logging in, users are redirected to a personalized dashboard where they can view their profile, property listings, rental payments, and messages.</li>
        <li><strong>Property Listings:</strong> Property owners can create and manage property listings with images, price, location, and availability details.</li>
        <li><strong>Property Search and Filters:</strong> Tenants can search for properties based on filters such as price, location, and property type.</li>
        <li><strong>Real-Time Chat:</strong> Tenants and property owners can communicate in real-time through integrated chat using Socket.IO.</li>
        <li><strong>Rental Payments:</strong> Rent payment functionality is integrated with Razorpay/Stripe for secure transactions.</li>
        <li><strong>Lease Agreement Tracking:</strong> Landlords and tenants can track lease agreements, including start and end dates, and receive notifications.</li>
        <li><strong>Saved Properties:</strong> Tenants can save properties for future reference and access them easily later.</li>
        <li><strong>Admin Panel:</strong> Property owners can manage their listings, view tenant applications, and track payment history from an admin panel.</li>
        <li><strong>Email Notifications:</strong> Email notifications are sent for various events like new rental applications, lease updates, and payment reminders.</li>
    </ul>

    <h3>How it Works:</h3>
    <ol>
        <li><strong>Sign Up/Log In:</strong> Users create an account or log in using email or Google.</li>
        <li><strong>Search for Properties:</strong> Tenants can search for available properties based on preferences.</li>
        <li><strong>Post Property Listings:</strong> Property owners list their properties with detailed information.</li>
        <li><strong>Chat with Landlord/Tenant:</strong> Real-time communication is facilitated through the chat feature for premium user.</li>
        <li><strong>Payment for property details:</strong> Tenants can make payments to get details about property through the integrated payment system.</li> 
    </ol>

    <h3>Challenges Overcome:</h3>
    <ul>
        <li><strong>Real-Time Communication:</strong> Using Socket.IO to provide real-time messaging between tenants and landlords. <b>(not complete yet)</b> </li>
        <li><strong>Payment Gateway Integration:</strong> Successfully integrated Razorpay to handle rent payments securely.</li>
        <li><strong>Responsive Design:</strong> Ensured the platform is responsive using Bootstrap/Tailwind CSS for all devices.</li>
        <li><strong>User Authentication and Security:</strong> Used JWT and bcrypt for secure user authentication.</li>
    </ul>

    <h3>Future Enhancements:</h3>
    <ul>  
        <li><strong>Property Reviews and Ratings:</strong> Enabling tenants to rate properties and landlords for better transparency.</li>
        <li><strong>AI Recommendations:</strong> Implementing AI-driven recommendations based on user preferences.</li>
        <li>more features will be added to it including deleting the account permentantly, subscription auto pay</li>
    </ul>
 
</div>

<a href="/" style={{color:'yellow',textDecoration:'none',textAlign:'center'}} > <div> Get Back </div></a>
        

        </section>
    </div>
    
);
    
};

export default HelpAboutPage;
