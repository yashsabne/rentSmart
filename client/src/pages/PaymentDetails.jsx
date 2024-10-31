import React, { useState, Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import BoxOpenAnimation from '../ModelThreeD/BoxOpenAnimation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/PaymentDetails.css';
import { PerspectiveCamera } from '@react-three/drei';
import gsap from 'gsap';
import CanvasLoader from '../ModelThreeD/CanvasLoader';
import { useMediaQuery } from 'react-responsive';

const PaymentDetails = () => {

    const backendUrl = process.env.REACT_APP_BASE_BACKEND_URL;
    const [paymentInfo, setPaymentInfo] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    const isMobile = useMediaQuery({ maxWidth: 600 });

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const orderId = queryParams.get('orderId');

        const fetchPaymentDetails = async () => {
            try {
                const response = await fetch(`${backendUrl}/payment/details?orderId=${orderId}`);
                const data = await response.json();
                if (data.success) {
                    setPaymentInfo(data.payment);
                } else {
                    console.error('Payment details not found');
                }
            } catch (error) {
                console.error('Error fetching payment details:', error);
            } finally {
                setLoading(false);
            }
        };

        if (orderId) fetchPaymentDetails();

        const detailsTimeout = setTimeout(() => setShowDetails(true), 1500);

        return () => clearTimeout(detailsTimeout);
    }, [location.search]);

    useEffect(() => {
        if (showDetails) {
            const yValue = isMobile ? -80 : -200; 
            const yValueIn = isMobile ? 80 : -75;  
            gsap.fromTo(
                ".propertyOwnerInfo",
                { opacity: 0, y: yValueIn },
                { opacity: 1, y: yValue, duration: 2.5, ease: 'bounce.out' }
            );
        
        }
    }, [showDetails]);

    const handlePrint = () => {
        const printContent = document.getElementById('payment-container').outerHTML;
    
        // Clone `.propertyOwnerInfo` content without inline styles
        const propertyOwnerInfoElement = document.querySelector('.propertyOwnerInfo');
        let printContent2 = '';
    
        if (propertyOwnerInfoElement) {
            const clonedElement = document.createElement('div');
            clonedElement.className = 'propertyOwnerInfo';
            clonedElement.innerHTML = propertyOwnerInfoElement.innerHTML; // Copy content without inline styles
            printContent2 = clonedElement.outerHTML;
        }
    
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
            <head>
                <title>Print Payment Details</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                    }
                    .payment-container { margin: 0 auto; } 
                </style>
            </head>
            <body>
            <p style="text-align: center;" > just print you will get the contact details on the second page of pdf </p>
                ${printContent} ${printContent2}
            </body>
            </html>
        `);
        printWindow.document.close();
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 500);  
    };
    

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading payment details...</p>
            </div>
        );
    }

    return paymentInfo ? (
        <div>
            <Navbar />
            <div className="payment-container" id="payment-container">
                <h1>Payment Details</h1>
                <p><span>Property ID:</span> {paymentInfo.propertyId}</p>
                <p><span>Sign (your):</span> <small>{paymentInfo.signature}</small></p>
                <p><span>Order ID:</span> {paymentInfo.orderId || '100'}</p>
                <p><span>Status:</span> {paymentInfo.status}</p>
                <p><span>Time:</span> {paymentInfo.timestamp}</p>

                {showDetails && (
                    <>
                        <div className="propertyOwnerInfo bounce">
                            <h3>Details Revealed...</h3>
                            <p><span>First Name:</span> {paymentInfo.firstName}</p>
                            <p><span>Last Name:</span> {paymentInfo.lastName}</p>
                            <p><span>Phone Number:</span> {paymentInfo.phone || 'Not available'}</p>
                        </div>
                     
                    </>
                )}

                <div className="box-canvas-container">
                    <Canvas className="box-canvas">
                        <Suspense fallback={<CanvasLoader />}>
                            <ambientLight intensity={0.5} />
                            <directionalLight position={[10, 10, 5]} intensity={1} />
                            <PerspectiveCamera makeDefault position={[0, 5, 20]} />
                            <BoxOpenAnimation position= {[0, -4, 0]} scale={1.27} />
                        </Suspense>
                    </Canvas>
                </div>

                <div className="btn-print-getback">
                    <a href="/dashboard">
                        <button className="print-button">Get Back</button>
                    </a>
                    <button className="print-button" onClick={handlePrint}>Print</button>
                </div>
            </div>
            <Footer />
        </div>
    ) : (
        <p>Payment details not found.</p>
    );
};

export default PaymentDetails;
