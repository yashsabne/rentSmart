import React, { useState, useEffect } from 'react';
import '../styles/SubscriptionPage.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';

const PremiumSubscriptionPage = () => {
  const [activeSection, setActiveSection] = useState('features');
  const location = useLocation();
  const navigate = useNavigate();
  const [premiumStatus, setPremiumStatus] = useState(false);
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [premiumDetailsData, setpremiumDetailsData] = useState([]);
  const [premiumMemeberName, setpremiumMemeberName] = useState('');
  const [premiumMemeberEmail, setpremiumMemeberEmail] = useState('');
  const [premiumMemeberPhone, setpremiumMemeberPhone] = useState('');
   

  const backendUrl = process.env.REACT_APP_BASE_BACKEND_URL;
  const razorpayKey = process.env.REACT_APP_RAZORPAY_KEY;
  console.log(razorpayKey)

  console.log(premiumDetailsData)

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const userPremiumStatus = queryParams.get('PremiumStatus') === 'true';
    const userIdFromParams = queryParams.get('userId');
    setUserId(userIdFromParams);

    if (userPremiumStatus) {
      setPremiumStatus(true);
    } else {
      fetchUserPremiumStatus(userIdFromParams);
    }
    fetchUserPremiumDetails(userIdFromParams);
  }, [location.search]);

  const fetchUserPremiumDetails = async (userId) => {
    try {
      const response = await fetch(`${backendUrl}/users/get-detailsOf-premiumMember/${userId}`, {
        method: 'GET'
      });

      if (response.ok) {
        const data = await response.json();
        setpremiumDetailsData(data.premiumMemberDetails);
        setpremiumMemeberName(data.name)
        setpremiumMemeberEmail(data.emailUser) 
        setpremiumMemeberPhone(data.phoneUser)
        
      } else {
        console.log('Error fetching premium details');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchUserPremiumStatus = async (userId) => {
    try {
      const response = await fetch(`${backendUrl}/users/checkingForPremium-user/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setPremiumStatus(data.premiumStatus);
        if (data.premiumStatus) {
          navigate(`?userId=${userId}&PremiumStatus=true`);
        }
      }
    } catch (error) {
      console.error('Error fetching premium status:', error);
    }
  };

  const confirmPremiumUser = async (paymentResponse, userId) => {
    try {
      const response = await fetch(`${backendUrl}/users/becomeAPremium-user/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentResponse })
      });

      if (response.ok) {
        setMessage('You are now a premium user!');
        setPremiumStatus(true);
        navigate(`?userId=${userId}&PremiumStatus=true`);
      }
    } catch (error) {
      console.error('Error confirming premium user:', error);
      setMessage(error.message);
    }
  };

  const handlePremiumMemberButton = async () => {

    const subBtn = document.querySelector('.subscribe-button');
    subBtn.innerHTML = "loading Payment Page"

    try {
      const orderResponse = await fetch(`${backendUrl}/users/create-order-premium/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      const { orderId, amount, currency } = await orderResponse.json();

      const options = {
        key: razorpayKey,
        amount: amount,
        currency: currency,
        name: 'Premium Property',
        description: 'Payment for premium subscription',
        order_id: orderId,
        handler: async (paymentResponse) => {
          await confirmPremiumUser(paymentResponse, userId);
          subBtn.innerHTML = 'Finalizing... Please stay on this page';
          console.log(paymentResponse);
        },
        theme: { color: '#3399cc' }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
          subBtn.innerHTML = "Complete the payment"
    } catch (error) {
      console.error('Error initiating payment:', error);
      setMessage(error.message);
    }
  };

  const printModalContent = () => {
    const printContent = document.getElementById("printable-modal-content").innerHTML;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print the subscription details</title>'); 
    printWindow.document.write('</head><body>');
    printWindow.document.write(printContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };


  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Navbar />
      <div className="subscription-container">
        <header className="subscription-header">
          <h1>Upgrade to RentEase Premium</h1>
          <p className="header-description">Experience unparalleled access to properties and personalized support.</p>
        </header>

        <div className="plan-details">
          <div className="plan-card"> 
            {premiumStatus ? (
                <h2>Your Current Premium Plan</h2>
              ) : (
                <h2>Discover Premium Plan</h2>
              )}
            <p className="plan-price">Rs.179/month</p>
            <p className="plan-tagline">Exclusive tools and services designed for serious seekers.</p>

            <div className="plan-content">
              <div className="features-section">
                <div className="plan-buttons">
                  <button
                    className={`tab-button ${activeSection === 'features' ? 'active' : ''}`}
                    onClick={() => setActiveSection('features')}
                  >
                    Features
                  </button>
                  <button
                    className={`tab-button ${activeSection === 'benefits' ? 'active' : ''}`}
                    onClick={() => setActiveSection('benefits')}
                  >
                    Benefits
                  </button>
                  <button
                    className={`tab-button ${activeSection === 'faq' ? 'active' : ''}`}
                    onClick={() => setActiveSection('faq')}
                  >
                    FAQ
                  </button>
                </div>
                <div className="tab-content">
                  {activeSection === 'features' && (
                    <ul className="feature-list">
                      <li>Unlimited contact reveals and instant access</li>
                      <li>Direct chat with property owners</li>
                      <li>Exclusive email requests with fast response</li>
                    </ul>
                  )}
                  {activeSection === 'benefits' && (
                    <ul className="benefits-list">
                      <li>Priority customer support and assistance</li>
                      <li>Access to exclusive, premium listings</li>
                      <li>Customized property recommendations</li>
                    </ul>
                  )}
                  {activeSection === 'faq' && (
                    <div className="faq-list">
                      <h4>What does the Premium plan include?</h4>
                      <p>The Premium plan provides exclusive access to listings, chat options, and priority support.</p>
                      <h4>Can I cancel anytime?</h4>
                      <p>Yes, you can cancel anytime from your account settings without additional fees.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="comparison-section">
                <h3>Membership Comparison</h3>
                <small>*For free members, features will activate at midnight on the first day of each month as per the info given below.</small>
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th>Feature</th>
                      <th>Free Member</th>
                      <th>Premium Member</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Contact Requests</td>
                      <td>5 per month</td>
                      <td>Unlimited</td>
                    </tr>
                    <tr>
                      <td>Contact Reveals</td>
                      <td>2 per month</td>
                      <td>Unlimited</td>
                    </tr>
                    <tr>
                      <td>Chat with Property Owners</td>
                      <td>Not available</td>
                      <td>Available</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="subscription-action">
              {premiumStatus ? (
                <button className="subscribe-button" onClick={toggleModal}>
                  Get the Subscription Details
                </button>
              ) : (
                <button className="subscribe-button" onClick={handlePremiumMemberButton}>
                  Start Premium for Rs.179/month
                </button>
              )}
              {message && <p className="subscription-message">{message}</p>}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
  <div className="premium-modal-overlay">
    <div className="premium-modal-content" id="printable-modal-content">
      <h2 className="premium-modal-title">Premium Membership Details</h2>
      <p className="premium-modal-description">
        Congratulations! You have access to all premium features, including:
      </p>
      <ul className="premium-modal-features">
        <li>Unlimited contact reveals and instant access</li>
        <li>Direct chat with property owners</li>
        <li>Exclusive email requests with fast response</li>
      </ul>

      <div className="premium-modal-user-info">
        <h3>User Details</h3>
        <p>
          <strong>Name:</strong> {premiumMemeberName}
        </p>
        <p>
          <strong>Email:</strong> {premiumMemeberEmail}
        </p>
        <p>
          <strong>Phone:</strong> {premiumMemeberPhone}
        </p>
      </div>

      <ul className="premium-modal-details-list">
        {premiumDetailsData.map((detail, i) => (
          <li key={i} className="premium-modal-subscription-info">
            <h4>Subscription Information</h4>
            <p>
              <strong>Subscription ID:</strong> <span>{detail._id}</span>
            </p>
            <p>
              <strong>User ID:</strong> <span>{detail.user}</span>
            </p>
            <p>
              <strong>Subscription Start:</strong> <span>{new Date(detail.subscriptionStart).toLocaleString()}</span>
            </p>
            <p>
              <strong>Subscription End:</strong> <span>{new Date(detail.subscriptionEnd).toLocaleString()}</span>
            </p>
            <p>
              <strong>Payment ID:</strong> <span>{detail.paymentId}</span>
            </p>
            <p>
              <strong>Order ID:</strong> <span>{detail.orderId}</span>
            </p>
          </li>
        ))}
      </ul>

      <div className="premium-modal-buttons">
        <button className="premium-modal-print-button" onClick={printModalContent}>
          Print
        </button>
        <button className="premium-modal-close-button" onClick={toggleModal}>
          Close
        </button>
      </div>
    </div>
  </div>
)}



      <Footer />
    </>
  );
};

export default PremiumSubscriptionPage;
