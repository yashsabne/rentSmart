import { useState, useEffect } from "react";
import "../styles/ListingCard.css";
import { ArrowForwardIos, ArrowBackIosNew } from "@mui/icons-material";
import { MdWorkspacePremium } from "react-icons/md";
import { useNavigate } from "react-router-dom";

// Utility function to convert image Buffer to Base64 in the browser
const convertToBase64 = (photo) => {
  return new Promise((resolve, reject) => {
    if (photo?.data?.data) {
      const buffer = new Uint8Array(photo.data.data);
      const blob = new Blob([buffer], { type: photo.contentType });
      const reader = new FileReader();
      
      reader.onloadend = () => {
        resolve(reader.result); // This gives the base64 string
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(blob);
    } else {
      resolve(photo); // If it's already a URL or image
    }
  });
};

const ListingCard = ({
  listingId,
  photos = [], // Updated to photos (from the backend)
  city,
  pincode,
  country,
  category,
  type,
  buyOrSell,
  price,
  paymentType,
  promoted,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageUrls, setImageUrls] = useState([]); // State to hold the Base64 image URLs

  // Convert all images to Base64 upon loading
  useEffect(() => {
    const loadImages = async () => {
      const base64Images = await Promise.all(photos.map((photo) => convertToBase64(photo)));
      setImageUrls(base64Images); // Store the Base64 strings in state
    };

    loadImages();
  }, [photos]);

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const navigate = useNavigate();
  const onlyOneImg = imageUrls.length === 1;
  const hideButton = onlyOneImg ? { display: "none" } : {};

  return (
    <div
      className="listing-card"
      onClick={() => {
        navigate(`/properties/${listingId}`);
      }}
    >
      <div className="slider-list-container">
        <div
          className="slider-list"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {imageUrls.map((photo, index) => (
            <div key={index} className="slide-list">
              {promoted && (
                <span className="promoted-text">
                  <span className="promoted-text-tip">Promoted</span>
                  <MdWorkspacePremium />
                </span>
              )}

              {/* Render image with converted Base64 */}
              <img src={photo} alt={`photo ${index + 1}`} />
            </div>
          ))}
        </div>

        <div
          className="prev-button"
          style={hideButton}
          onClick={(e) => {
            e.stopPropagation();
            goToPrevSlide();
          }}
        >
          <ArrowBackIosNew sx={{ fontSize: "15px" }} />
        </div>
        <div
          className="next-button"
          style={hideButton}
          onClick={(e) => {
            e.stopPropagation();
            goToNextSlide();
          }}
        >
          <ArrowForwardIos sx={{ fontSize: "15px" }} />
        </div>
      </div>

      <div className="card-info">
        <div>
          <h3>
            {city}, {country} -{" "}
            <span
              style={{
                padding: 0,
                margin: 0,
                color: "wheat",
                fontSize: "medium",
              }}
            >
              {pincode}
            </span>
          </h3>
          <p>{category}</p>
          <p>{type}</p>
          <p>{buyOrSell}</p>
          <p>
            <span>₹ {price}</span>
            <span
              style={{
                color: "white",
                fontSize: "small",
                marginLeft: 2,
              }}
            >
              ({paymentType})
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
