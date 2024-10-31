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

            if (response.ok) {
                setIsModalOpen(false);
            } else {
                console.error('Failed to send email');
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    const onRevealNumberClick = async () => {
        const revealButton = document.querySelector('.reveal-button');
        revealButton.innerHTML = 'Loading the payment page';
    
        try {  
            const orderResponse = await fetch(`${backendUrl}/payment/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: 100 }), 
            });
            
            const data = await orderResponse.json();
            const options = {
                key: razorpay_key, 
                amount: 100 * 100,
                currency: 'INR',
                name: 'Rent Smart',
                description: 'Reveal Phone Number',
                order_id: data.orderId,
                handler: async function (paymentResponse) {   
                    console.log("Payment Successful", paymentResponse); 
                    try {
                        const response = await fetch(`${backendUrl}/payment/successful-payment/${paymentResponse.razorpay_order_id}/${paymentResponse.razorpay_signature}?propertyId=${propertyId}&userId=${userIdSender}&status=true`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ propertyId }),
                        });
    
                        if (response.ok) {
                            const data = await response.json();
                            console.log("Payment details saved:", data);
                        } else {
                            console.error("Failed to save payment data:", await response.text());
                        }
                    } catch (error) {
                        console.error("Error sending payment success data:", error);
                    }
    
                    window.location.href = `/payment/details?orderId=${paymentResponse.razorpay_order_id}`;
                },
                theme: {
                    color: '#3399cc',
                },
                modal: {
                    ondismiss: function() {
                        revealButton.innerHTML = 'Reveal Phone Number';
                    }
                }
            };  
            const rzp = new window.Razorpay(options);
            rzp.open();
            revealButton.innerHTML = 'Kindly Complete Payment...if done please stay on the page do not refresh it make take some time';
        } catch (error) {
            console.error('Error initiating payment:', error);
            revealButton.innerHTML = 'Reveal Phone Number';
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
                        <a href="/chat-with-owner" className='a_contact'>
                            <button className="contact-button premium-button">Start Chat</button>
                        </a>
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
            />
            <Footer />
        </div>
    );
};

export default ContactPropertyOwner;
