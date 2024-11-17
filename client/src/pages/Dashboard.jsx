import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPropertyList } from "../redux/state";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import "../styles/Dashboard.css";
import SaveForLaterListingCard from "../components/SaveForLaterListCard";
import CustomModal from "../components/DeleteConfirmationModal";
import { CiCirclePlus } from "react-icons/ci";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState([]);
  const [savedProperties, setSavedProperties] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [premiumMemberStatus, setpremiumMemberStatus] = useState(false);

  const backendUrl = process.env.REACT_APP_BASE_BACKEND_URL;


  const showMorePayments = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  const user = useSelector((state) => state.user);
  const propertyList = user?.propertyList || [];
  const dispatch = useDispatch();
  const userId = user?._id;

  const getPropertyList = async () => {
    try {
      const response = await fetch(`${backendUrl}/users/${userId}/properties`);
      const data = await response.json();
      dispatch(setPropertyList(data));
      setLoading(false);
    } catch (err) {
      console.log("Fetch all properties failed", err.message);
    }
  };

  const getRecentActivities = async () => {
    if (!user || !user._id) return;

    try {
      const response = await fetch(`${backendUrl}/users/${userId}/recent-activities`);
      const data = await response.json();
      setRecentActivities(data.activities || []);
    } catch (err) {
      console.log("Fetch recent activities failed", err.message);
    }
  };

  const getSavedProperties = async () => {
    try {
      const response = await fetch(`${backendUrl}/users/${userId}/savedProperties`);
      const data = await response.json();
      setSavedProperties(data.savedProperties || []);
    } catch (error) {
      console.log("Failed to fetch saved properties", error.message);
    }
  };

  // Delete a saved property
  const handleDeleteSavedProperty = async () => {
    try {
      const response = await fetch(`${backendUrl}/users/${userId}/savedProperties/${propertyToDelete}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSavedProperties(savedProperties.filter((property) => property._id !== propertyToDelete));
        setShowDeleteModal(false); // Close the modal
        console.log("Property deleted successfully");
      } else {
        alert("Failed to delete the property");
      }
    } catch (error) {
      console.log("Failed to delete saved property", error.message);
    }
  };

  // Delete recent activities
  const handleDeleteRecentActivities = async () => {
    try {
      await fetch(`${backendUrl}/users/${userId}/recent-activities-delete`, {
        method: "DELETE",
      });
      setRecentActivities([]);
      setShowClearModal(false);
    } catch (error) {
      console.log("Failed to delete recent activities", error.message);
    }
  };

  const getPaymentHist = async () => {
    try {
      const response = await fetch(`${backendUrl}/payment/get-payment-histroy/${userId}`);
      const data = await response.json();
      setPaymentHistory(data || []);

    } catch (err) {
      console.log("Fetch recent payment history failed", err.message);
    }
  };
  const confirmDeleteProperty = (propertyId) => {
    setPropertyToDelete(propertyId);
    setShowDeleteModal(true);
  };

  const confirmClearHistory = () => {
    setShowClearModal(true);
  };

  const getPremiumUser = async () => {
    if (!user || !user._id) return;

    try {
      const response = await fetch(`${backendUrl}/users/checkingForPremium-user/${userId}`);
      const data = await response.json();
      setpremiumMemberStatus(data.premiumStatus);
    } catch (err) {
      console.log("Fetch recent activities failed", err.message);
    }
  };

  useEffect(() => {
    if (user) {
      getPropertyList();
      getRecentActivities();
      getSavedProperties();
      getPaymentHist();
      getPremiumUser();
    }
  }, [user]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div className="dashboard-container">

        <div style={{ display: 'flex', justifyContent: 'center' }} >

          <div className="dashboard-user-info">

            <div className="premium-dashboard-userInfo">

{/*           {user && user.profileImagePath ? (
  <img
    src={`${backendUrl}/${user.profileImagePath.replace("public", "")}`}
    alt="User Profile"
    className="dashboard-profile-photo"
    style={{ borderColor: premiumMemberStatus ? 'gold' : 'white' }}
  />
) : (
  <p>No profile photo available</p>
)} */}

          

              
              <div className="user-info-text">
                <h2>{user?.firstName ? `${user.firstName} ${user.lastName}` : "Username"}</h2>
                <p>Email: {user?.email || "user@example.com"}</p>
                <p>Phone: {user?.phone || "45646544554"}</p>
                <small>UserId: {user?._id || "*****"}</small>
              </div>
            </div>


{/*             {premiumMemberStatus ? (
              <a
                href={`users/discover-premium-version?userId=${user._id}&PremiumStatus=${premiumMemberStatus}`}
                style={{ color: 'white' }}
                className="premium-text-link"
              >
                <div className="premium-link">
              
                </div>
              </a>
            ) : (
              <a
                href={`users/discover-premium-version?userId=${user._id}&PremiumStatus=${premiumMemberStatus}`}
                style={{ color: 'white' }}
                className="become-premium-link"
              >
                <div className="premium-link-a">
                  Become Premium
                </div>
              </a>
            )}        
 */}


            {premiumMemberStatus ? (
  <a
    href={`users/discover-premium-version?userId=${user._id}&PremiumStatus=${premiumMemberStatus}`}
    style={{ color: 'white' }}
    className="premium-text-link"
  >
    <div className="premium-link"></div>
  </a>
) : (
  <a
    href={`users/discover-premium-version?userId=${user._id}&PremiumStatus=${premiumMemberStatus}`}
    style={{ color: 'white' }}
    className="become-premium-link"
  >
    <div className="premium-link-a">Become Premium</div>
  </a>
)}






          </div>
        </div>


        <div className="dashboard-property-section">
          <h1 style={{ display: 'flex', alignItems: "center", height: '60px' }}>
            Your Listed Properties
            <a style={{ position: 'relative', top: '6px', color: 'white', marginLeft: '15px' }} href="/create-listing">
              <CiCirclePlus />
            </a>
          </h1>
          <div className="dashboard-property-list">
            {propertyList.length > 0 ? (
              propertyList.map(
                ({
                  _id,
                  creator,
                  listingPhotoPaths,
                  city,
                  pincode,
                  country,
                  category,
                  type,
                  buyOrSell,
                  price,
                  paymentType,
                  promoted = false

                }) => (
                  <ListingCard
                    key={_id}
                    listingId={_id}
                    creator={creator}
                    listingPhotoPaths={listingPhotoPaths}
                    city={city}
                    pincode={pincode}
                    country={country}
                    category={category}
                    type={type}
                    buyOrSell={buyOrSell}
                    price={price}
                    paymentType={paymentType}
                    promoted={promoted}
                  />
                )
              )
            ) : (
              <p>No properties listed yet.</p>
            )}
          </div>
        </div>

        <div className="dashboard-saved-section">
          <h1>Saved for Later</h1>
          <div className="dashboard-saved-list">
            {savedProperties.length > 0 ? (
              savedProperties.map(
                ({
                  _id,
                  listingPhotoPaths,
                  city,
                  pincode,
                  country,
                  category,
                  type,
                  price,
                  paymentType,
                }) => (
                  <SaveForLaterListingCard
                    key={_id}
                    listingId={_id}
                    listingPhotoPaths={listingPhotoPaths}
                    city={city}
                    pincode={pincode}
                    country={country}
                    category={category}
                    type={type}
                    price={price}
                    paymentType={paymentType}
                    handleDelete={() => confirmDeleteProperty(_id)} // Open modal on delete
                  />
                )
              )
            ) : (
              <p>No properties saved yet.</p>
            )}
          </div>
        </div>

        <div className="dashboard-activities-section">
          <h2 className="email_sent_his">
            Email Sent History
            {recentActivities.length > 0 && (
              <button onClick={confirmClearHistory}>Clear History</button>
            )}
          </h2>
          <div className="dashboard-activities-list">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity, index) => (
                <div key={index} className="dashboard-activity-card">
                  <p>
                    <strong>To:</strong> {activity.receiverEmail}
                  </p>
                  <p>
                    <strong>Date Sent:</strong> {new Date(activity.createdAt).toLocaleString()}
                  </p>
                  <p>
                    <strong>For Property ID:</strong> {activity.propertyId}
                  </p>
                </div>
              ))
            ) : (
              <p>No recent activities.</p>
            )}
          </div>
        </div>

          <div className="dashboard-activities-section">
          <h1>Payment history of contact reveal </h1>
          {paymentHistory.length > 0 ? (
            paymentHistory.slice(0, visibleCount).map((payment, index) => (
              <div key={index} className="dashboard-payment-card">
                <p>
                  <strong>Transaction ID:</strong> {payment.orderId}
                </p>
                <p>
                  <strong>Property ID:</strong> {payment.propertyId}
                </p>
                <p>
                  <strong>Date:</strong> {new Date(payment.timestamp).toLocaleString()}
                </p>
                <p>
                  <strong>Status:</strong> {payment.status}
                </p>
              </div>
            ))
          ) : (
            <p>No payment history available.</p>
          )}
          {visibleCount < paymentHistory.length && (
            <button onClick={showMorePayments} className="show-more-button">
              Show More
            </button>
          )}
        </div>
      </div>

      <CustomModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)} // Close modal without deleting
        handleDelete={handleDeleteSavedProperty} // Delete property
        message="Are you sure you want to delete this saved property?" // Example confirmation message
      />

      <CustomModal
        show={showClearModal}
        handleClose={() => setShowClearModal(false)}
        handleDelete={handleDeleteRecentActivities}
        message="Are you sure you want to clear your recent activities?"
      />

      <Footer />
    </>
  );
};

export default Dashboard;
