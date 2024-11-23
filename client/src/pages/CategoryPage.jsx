import { useState, useEffect } from "react";
import "../styles/List.css";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
 
import Loader from "../components/Loader";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";

const backendUrl = process.env.REACT_APP_BASE_BACKEND_URL;

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  // const [listings, setListings] = useState([]);
  const { category } = useParams();
  const dispatch = useDispatch(); 
  const [sortedListings, setSortedListings] = useState([]);

   

  const getFeedListings = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/properties?category=${category}`,
        { method: "GET" }
      );
      const data = await response.json();
 
      setSortedListings((data)); 
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [category]);

  // Sort functions
  const sortByPriceDescending = () => {
    const sorted = [...sortedListings].sort((a, b) => b.price - a.price);
    setSortedListings(sorted);
  };

  const sortByPriceAscending = () => {
    const sorted = [...sortedListings].sort((a, b) => a.price - b.price);
    setSortedListings(sorted);
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
 
      <header className="category-header">
        <h1 className="title-list">{category} Listings</h1>
        <p className="header-description">
          Discover the best {category} options available for rent or purchase, with curated listings to meet your needs.
        </p>


      </header>

      <div className="sort-buttons">
        <button onClick={sortByPriceDescending} className="sort-button">
          Sort by Price (High to Low)
        </button>
        <button onClick={sortByPriceAscending} className="sort-button">
          Sort by Price (Low to High)
        </button>
      </div>



      <div className="list">
        {sortedListings?.map(
          ({
            _id,
            creator,
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
            highlightDesc
          }) => (
            <ListingCard
              key={_id}
              listingId={_id}
              creatorName={`${creator.firstName} ${creator.lastName}`}
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

export default CategoryPage;
