import { useParams } from "react-router-dom"; 
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import { TbH3 } from "react-icons/tb";

const SearchPage = () => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const { search } = useParams();
  const backendUrl = process.env.REACT_APP_BASE_BACKEND_URL;

  const getSearchListings = async () => {
    try {
      const response = await fetch(`${backendUrl}/properties/search/${search}`, {
        method: "GET"
      });

      const data = await response.json();
      setListings(data); // Correctly set the fetched data
      setLoading(false);
    } catch (err) {
      console.log("Fetch Search List failed!", err.message);
    }
  };

  useEffect(() => {
    getSearchListings();
  }, [search]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar getSearchListings={getSearchListings} />
     
      <p className="title-list" style={{ marginTop: '90px',marginBottom:'20px', textAlign: 'center',fontSize:'larger' }}>
      <span style={{ fontSize:'medium' }}> showing results for</span> "{search.toUpperCase()}"
      </p>

      <div className="list">
        {listings?.map(
          ({
            _id, 
            listingPhotos,
            city,
            pincode,
            country,
            category,
            type,
            price,
            paymentType,
            title,
            description,
            highlight,
            highlightDesc,
            promoted = false
          }) => (
            <ListingCard
              key={_id}
              listingId={_id} 
              photos={listingPhotos}
              city={city}
              pincode={pincode}
              country={country}
              category={category}
              type={type}
              price={price}
              paymentType={paymentType}
              title={title}
              description={description}
              highlight={highlight}
              highlightDesc={highlightDesc}
              promoted={promoted}
            />
          )
        )}
      </div>

      <div style={{position:"absolute",bottom:0,width:'100%'} }>
      <Footer />
      </div>
    </>
  );
};

export default SearchPage;
