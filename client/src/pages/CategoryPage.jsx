import { useState, useEffect } from "react";
import "../styles/List.css";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import Loader from "../components/Loader";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer"

const backendUrl = process.env.REACT_APP_BASE_BACKEND_URL;
 

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const { category } = useParams()

  const dispatch = useDispatch()
  const listings = useSelector((state) => state.listings);

  const getFeedListings = async () => {
    try {
      const response = await fetch(
          `${backendUrl}/properties?category=${category}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [category]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">{category} listings</h1>
      <div className="list">
      {listings?.map(
          ({
            _id,
            creator,
            listingPhotoPaths,
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
              listingPhotoPaths={listingPhotoPaths}
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
      <Footer />
    </>
  );
};

export default CategoryPage;
