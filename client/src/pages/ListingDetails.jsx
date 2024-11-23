import { useEffect, useState } from "react";
import "../styles/ListingDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { facilities } from "../data";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { CiHome, CiBookmarkPlus } from "react-icons/ci";



const ListingDetails = () => {

  const [loading, setLoading] = useState(true);
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [message, setMessage] = useState('');
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const userId = user._id

  const backendUrl = process.env.REACT_APP_BASE_BACKEND_URL;
  const razorpay_key = process.env.REACT_APP_RAZORPAY_KEY;
 


  const getListingDetails = async () => {
    try {
      const response = await fetch(`${backendUrl}/properties/${listingId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setListing(data);
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listing Details Failed", err.message);
      setLoading(false); // Stop loading on error
    }
  };

  useEffect(() => {
    getListingDetails();
  }, [listingId]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this property?");
    if (confirmDelete) {
      try {
        await fetch(`${backendUrl}/properties/${listingId}`, { method: "DELETE" });
        alert("Property deleted successfully.");
        navigate("/dashboard"); 
      } catch (err) {
        console.log("Delete Property Failed", err.message);
      }
    }
  };

  const handleSaveProperties = async () => {
    try {
      const response = await fetch(`${backendUrl}/users/${userId}/saved-property`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',  // Set the content type to JSON
        },
        body: JSON.stringify({ listing })    // Convert body to JSON string
      });

      const data = await response.json(); // Parse the response
      if (response.ok) {
        setMessage("Property saved successfully!"); // Success message
      } else {
        setMessage(data.message); // Error message from the backend
      }
    } catch (error) {
      console.error("Error saving property:", error);
      setMessage("Failed to save property."); // Display error message
    }
  };

  const handlePromoteProperty = async () => {
    try {

      const promotePropertBtn = document.querySelector('.promote-property-btn');

      promotePropertBtn.innerHTML = "Loading payment page"

      const promotionStatusResponse = await fetch(`${backendUrl}/payment/check-promotion-status/${listingId}`);
      const promotionStatus = await promotionStatusResponse.json();

      console.log(promotionStatus)
      
      if (promotionStatus.promoted) {
        setMessage("This property is already promoted!");
         promotePropertBtn.innerHTML = "Promoted already"
        return;  
      }
  
      const orderResponse = await fetch(`${backendUrl}/payment/create-order/${listingId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      const { orderId, amount, currency } = await orderResponse.json();
  
      const options = {
        key: razorpay_key,
        amount: amount,
        currency: currency,
        name: 'Promote Property - RentSmart',
        description: 'Payment to promote property',
        order_id: orderId,
        handler: async (paymentResponse) => {
          await confirmAndPromote(paymentResponse, listingId, userId);
           promotePropertBtn.innerHTML = "Finalizing the things"
        },
        theme: { color: '#3399cc' }
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
       promotePropertBtn.innerHTML = "Complete the payment"
      
    } catch (error) {
      console.log(error);
    }
  };
  
  const confirmAndPromote = async (paymentResponse, listingId, userId) => {
    try {
      const response = await fetch(`${backendUrl}/payment/promote-property`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentResponse, listingId, userId })
      });
      const data = await response.json();

      if (response.ok) {
        setMessage('Property successfully promoted');
      } else {
        setMessage(data.message || 'Promotion failed');
      }
    } catch (error) {
      console.log(error);
    }
  };



  const changeSlide = (direction) => {
    if (!isSliding) {
      setIsSliding(true);
      setTimeout(() => {
        setIsSliding(false);
        setCurrentImageIndex((prevIndex) => {
          if (direction === "next") {
            return prevIndex === listing.listingPhotos.length - 1 ? 0 : prevIndex + 1;
          } else {
            return prevIndex === 0 ? listing.listingPhotos.length - 1 : prevIndex - 1;
          }
        });
      }, 1000);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div className="listing-details-container">
        <div className="listing-header">
          <div className="title-section">
            <h1>{listing.title}</h1>
            {user && user._id === listing.creator._id && (
              <div className="owner-badge">
                <CiHome size={24} />
                <span>My Property</span> <span style={{ marginLeft: '2px', fontSize: 'small', color: 'brown' }} >(id:{listingId})</span>
              </div>
            )}
          </div>
          <div className="location-info">
            <h3>
              {listing.type} in {listing.city}, {listing.pincode}, {listing.country}
            </h3>
          </div>
        </div>
 
        <div className="listing-slider">
          <button
            onClick={() => changeSlide("prev")}
            className={`slider-button prev-button ${isSliding ? "disabled" : ""}`}
          >
            ◀
          </button>
          <div className="slider-image-wrapper">
            <img
              src={`${backendUrl}/properties/photo/${listing._id}/${currentImageIndex}`} // Updated to fetch from the backend
              alt={`Listing Image ${currentImageIndex + 1}`}
              className={`slider-image ${isSliding ? "slide-animation" : ""}`}
            />
          </div>

          <button
            onClick={() => changeSlide("next")}
            className={`slider-button next-button ${isSliding ? "disabled" : ""}`}
          >
            ▶
          </button>

        </div>

        <div className="host-section">
          <div className="profile-card">
          <img
    src={`${backendUrl}/auth/get-profile-picture-user/${listing.creator._id}`}
    alt="User Profile"
    className="dashboard-profile-photo"
 
  />
            <h3>
              {user._id === listing.creator._id
                ? "Hosted by Me"
                : `Hosted by ${listing.creator.firstName} ${listing.creator.lastName}`}
            </h3>
          </div>
        </div>

        <div className="details-section">
          <h2>Description</h2>
          <p>{listing.description}</p>
          <p style={{ fontWeight: 'bolder', textDecoration: 'underline' }}>
            {listing.bathroomCount} bathrooms
          </p>

          {listing.highlight && (
            <>
              <h2>{listing.highlight}</h2>
              <p>{listing.highlightDesc}</p>
            </>
          )}

          <h2>Amenities</h2>
          <div className="amenities-section">
            {listing.amenities[0].split(",").map((item, index) => (
              <div className="amenity-card" key={index}>
                <div className="amenity-icon">
                  {facilities.find((facility) => facility.name === item)?.icon}
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="property-action">

          {user._id === listing.creator._id ? (
            <>
              <div className="action-buttons">
                <button className="delete-button" onClick={handleDelete}>
                  Delete Property
                </button>
                <button className="promote-property-btn" onClick={handlePromoteProperty} >
                  Promote Property
                </button>
              </div>
              <div>
                {message && (
                  <p
                    className="message-box"
                    style={
                      message === "Property already saved"
                        ? { color: "red", margin: '10px 0' }
                        : { color: "green", margin: '10px 0' }
                    }
                  >
                    {message}
                  </p>
                )}
              </div>
            </>
          ) : (

            <div className="prop-handel" >

              <button className="contact-button" onClick={handleSaveProperties} >
                <span className="save-text" > Save for later</span> <span className="save-icon"> <CiBookmarkPlus /></span>
              </button>

              {message && (
                <p
                  className="message-box"
                  style={
                    message === "Property already saved"
                      ? { color: "red", margin: '10px 0' }
                      : { color: "green", margin: '10px 0' }
                  }
                >
                  {message}
                </p>
              )}

              <a href={`/users/contact-property-owner?propertyId=${listingId}&userId=${userId}`} style={{ textDecoration: 'none' }} >
                <button className="contact-button">
                  Contact Owner
                </button>
              </a>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ListingDetails;
