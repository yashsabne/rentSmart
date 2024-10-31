import { useState, useEffect } from "react";
import "../styles/SaveForLaterListingCard.css";
import { ArrowForwardIos, ArrowBackIosNew } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; 
import { MdDeleteOutline } from "react-icons/md";

const SaveForLaterListingCard = ({
  listingId,
  listingPhotoPaths,
  city,
  pincode,
  country,
  category,
  type,
  price,
  paymentType,
  handleDelete,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + listingPhotoPaths.length) % listingPhotoPaths.length
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % listingPhotoPaths.length);
  };

  const navigate = useNavigate();
 

  const onlyOneImg = listingPhotoPaths.length === 1;
  const hideButton = onlyOneImg ? { display: "none" } : {};

  const backendUrl = process.env.REACT_APP_BASE_BACKEND_URL;
 

  return (
    <div className="saveForLaterContainer">
    <div className="saveforlater-listing-card">
      <div
        className="slider-list-container"
        onClick={() => navigate(`/properties/${listingId}`)}
      >
        <div
          className="slider-list"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {listingPhotoPaths?.map((photo, index) => (
            <div key={index} className="slide-list">
              <img
                src={`${backendUrl}/${photo?.replace("public", "")}`}
                alt={`photo ${index + 1}`}
              />
            </div>
          ))}
        </div>
 
        <div
          className="prev-button"
          style={hideButton}
          onClick={(e) => {
            e.stopPropagation();
            goToPrevSlide(e);
          }}
        >
          <ArrowBackIosNew sx={{ fontSize: "15px" }} />
        </div>
        <div
          className="next-button"
          style={hideButton}
          onClick={(e) => {
            e.stopPropagation();
            goToNextSlide(e);
          }}
        >
          <ArrowForwardIos sx={{ fontSize: "15px" }} />
        </div>
      </div>

      <div className="card-info">
        <h3>
          {city}, {country} -{" "}
          <span style={{ padding: 0, margin: 0, color: "wheat", fontSize: "medium" }}>
            {pincode}
          </span>
        </h3>
        <p>{category}</p>
        <p>{type}</p>
        <p>
          <span>₹ {price}</span>
          <span style={{ color: "white", fontSize: "small", marginLeft: 2 }}>
            ({paymentType})
          </span>
        </p>
 
        <button
          className="delete-button-s"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(listingId);
          }}
        >
          <MdDeleteOutline/>
        </button>
      </div>
    </div>
    
    </div>
  );
};

export default SaveForLaterListingCard;
