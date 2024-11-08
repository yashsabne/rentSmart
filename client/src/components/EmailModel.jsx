import React, { useState } from 'react';
import '../styles/EmailModal.css';
import { ImCross } from "react-icons/im";

const EmailModal = ({ isOpen, onClose, onSendEmail, senderEmail, receiverEmail,message }) => {
    const [clientName, setClientName] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const emailData = {
            nameofclient: clientName,  
            emailofclient: senderEmail,
            senderEmail,
            receiverEmail,
        };
        onSendEmail(emailData); 
        setClientName('');
        setIsEmailSent(true);  
    };

    if (!isOpen) return null;

    const customStyle = message === 'Email request limit reached. Please upgrade to premium or try after month'
    ? { color: 'red' }
    : {};



    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="button-div">
                <button type="button" onClick={onClose} className='button-close'>
                    <ImCross/>
                </button>
                </div>

                <h2 className='disapper_modal' >Contact Property Owner</h2>
                <p className='disapper_modal'>We are pleased to inform you that you have an opportunity to connect with the owner of the property.</p>
                <p className='disapper_modal'>Please fill in the details below to send your approval request.</p>

                <form onSubmit={handleSubmit} className='disapper_modal'>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        value={senderEmail}
                        readOnly
                    />
                    <div style={{display:'flex',justifyContent:'center'}} >
                        <button type="submit">Send Email</button>
                    </div>
                </form>
                {message && (
                    <div className="success-alert" style={customStyle}>
                        <p>{message}</p>
                    </div>
                )}

                <p className="note disapper_modal" >
                    <strong>Note:</strong> As you fill out the form, your request to connect will be sent to the property owner. 
                    If they accept the request, the property owner will have your contact number, and you will have theirs.
                </p>
            </div>
        </div>
    );
};

export default EmailModal;
