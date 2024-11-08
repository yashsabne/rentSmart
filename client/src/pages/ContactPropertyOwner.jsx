import React, { useState, useEffect } from 'react';
import "../styles/ContactPropertyOwner.css";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import EmailModal from '../components/EmailModel';
import { useLocation } from 'react-router-dom';
import { faqForContact } from '../data';

const ContactPropertyOwner = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [senderEmail, setSenderEmail] = useState('');
    const [receiverEmail, setReceiverEmail] = useState('');
    const [propertyId, setPropertyId] = useState('');
    const [userIdSender, setUserIdSender] = useState('');
    const location = useLocation();
    const [message, setmessage] = useState(""); 
    const [modalMessage, setModalMessage] = useState("");


    const backendUrl = process.env.REACT_APP_BASE_BACKEND_URL;
    const razorpay_key = process.env.REACT_APP_RAZORPAY_KEY;
 


    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const propertyIdFromParams = queryParams.get('propertyId');
        const userIdFromParams = queryParams.get('userId');

        setPropertyId(propertyIdFromParams);
        setUserIdSender(userIdFromParams);

        if (propertyIdFromParams && userIdFromParams) {
            fetchReceiverEmail(propertyIdFromParams, userIdFromParams);
        }
    }, [location.search]);

    const fetchReceiverEmail = async (propertyId, userIdSender) => {
        try {
            const response = await fetch(`${backendUrl}/users/contact-property-owner?propertyId=${propertyId}&userId=${userIdSender}`);
            if (response.ok) {
                const data = await response.json();
                if (data.receiverEmail && data.senderEmail) {
                    setReceiverEmail(data.receiverEmail);
                    setSenderEmail(data.senderEmail);
                } else {
                    console.error('Emails not found in the response', data);
                }
            } else {
                console.error('Failed to fetch emails');
            }
        } catch (error) {
            console.error('Error fetching emails:', error);
        }
    };

    const handleSendEmail = async (emailData) => {
        const requestData = {
            ...emailData,
            propertyId,
            userIdSender
        };
        try {
            const response = await fetch(`${backendUrl}/users/request-to-connect`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            const result = await response.json();   

            if (response.ok) {
                setModalMessage("Email sent successfully!");
                setTimeout(() => {
                    setIsModalOpen(false); 
                }, 2000);

                 
            } else {
                setModalMessage(result.message || "Failed to send email");   
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    const onRevealNumberClick = async () => {
        const revealButton = document.querySelector('.reveal-button');
        revealButton.innerHTML = 'Loading the payment page...';
    
        try {  
            const orderResponse = await fetch(`${backendUrl}/payment/create-order/${userIdSender}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: 100 }), // Set your amount here
            });
            
            const data = await orderResponse.json();
            
            if (!data.orderId) {
                revealButton.innerHTML = 'Reveal Phone Number';
                setmessage("Failed to initiate payment. Please try again after month. because you reached your free access kindly upgrade account to premium")
                return  
            }
    
            const options = {
                key: razorpay_key, 
                amount: 100 * 100,
                currency: 'INR',
                name: 'Rent Smart',
                description: 'Reveal Phone Number',
                order_id: data.orderId,
                handler: async function (paymentResponse) {   
                    console.log("Payment Successful:", paymentResponse); 
                    
                    revealButton.innerHTML = 'Finalizing... Please stay on this page';
                    try {
                        const response = await fetch(`${backendUrl}/payment/successful-payment/${paymentResponse.razorpay_order_id}/${paymentResponse.razorpay_signature}?propertyId=${propertyId}&userId=${userIdSender}&status=true`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ propertyId }),
                        });
    
                        if (response.ok) {
                            const result = await response.json();
                            console.log("Payment details saved:", result);
                            window.location.href = `/payment/details?orderId=${paymentResponse.razorpay_order_id}`;
                        } else {
                            console.error("Failed to save payment data:", await response.text());
                            alert("Payment successful, but there was an issue saving the details. Please contact support.");
                        }
                    } catch (error) {
                        console.error("Error sending payment success data:", error);
                        alert("Payment successful, but an error occurred. Please contact support.");
                    }
                },
                theme: { color: '#3399cc' },
                modal: {
                    ondismiss: function() {
                        revealButton.innerHTML = 'Reveal Phone Number';
                        alert("Payment process was interrupted. Please try again.");
                    }
                }
            };
            
            const rzp = new window.Razorpay(options);
            rzp.open();
            
            revealButton.innerHTML = 'Kindly complete the payment... Do not refresh the page.';
        } catch (error) {
            console.error('Error initiating payment:', error);
            revealButton.innerHTML = 'Reveal Phone Number';
            alert("Error initiating payment. Please try again.");
        }
    };

    

 

    return (
        <div className="contact-owner-page">
            <Navbar />

            <section className="intro-section">
                <h1 className="intro-heading">Directly Connect with Property Owners</h1>
                <p className="intro-description">
                    Explore multiple contact methods to connect with property owners for all the essential details you need.
                    Choose the approach that best suits your communication style and make informed decisions for your next
                    property investment or rental.
                </p>
            </section>

            <section className="contact-options-section">
                <h2 className="section-title">Contact Options</h2>
                <div className="contact-options-grid">
                    <div className="contact-option-card">
                        <div className="icon">&#128172;</div>
                        <h3>Premium Chat Access</h3>
                        <p>Instantly reach property owners through our exclusive chat feature for real-time conversations.</p>
                        <a className='a_contact'> {/* href="/chat-with-owner" */}
                            <button className="contact-button premium-button" style={{cursor:'not-allowed'}}>Start Chat</button>
                        </a>
                        <small>Temporary not available</small>

                    </div>

                    <div className="contact-option-card">
                        <div className="icon">&#9993;</div>
                        <h3>Email Contact</h3>
                        <p>Send detailed inquiries via email, ideal for gathering all property information before renting or buying.</p>
                        <a className='a_contact'>
                        <button className="contact-button email-button" onClick={() => setIsModalOpen(true)}>Send Email</button>
                        </a>
                    </div>

                    <div className="contact-option-card">
                        <div className="icon">&#128241;</div>
                        <h3>Reveal Phone Number</h3>
                        <p>Prefer a direct conversation? Reveal the owner's number to discuss all key details directly.</p>

                        <a className='a_contact'>
                            <button className="contact-button reveal-button" onClick={onRevealNumberClick}>   Reveal Number</button>
                        </a>
                        {message && <p className="error-message">{message}</p>}

                    </div>
                </div>
            </section>

            <section className="faq-section">
                <h2 className="section-title">Frequently Asked Questions</h2>
                <div className="faq-list">
                    {faqForContact.map((question, i) => (
                        <div className="faq-item" key={i}>
                            <h3>{question.indx + "."} {question.question}</h3>
                            <p>{question.answer}</p>
                        </div>
                    ))}
                </div>
            </section>



            <EmailModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSendEmail={handleSendEmail}
                senderEmail={senderEmail}   
                receiverEmail={receiverEmail} 
                message={modalMessage} 
            />
            <Footer />
        </div>
    );
};

export default ContactPropertyOwner;
