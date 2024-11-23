import "../styles/List.css";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { useEffect, useState } from "react"; 
import Loader from "../components/Loader";
import Footer from "../components/Footer"

const PropertyList = () => {
  const [loading, setLoading] = useState(true)
  const [propertyList, setpropertyList] = useState([]);
  const user = useSelector((state) => state.user) 
  const dispatch = useDispatch();

  const backendUrl = process.env.REACT_APP_BASE_BACKEND_URL;


  const getPropertyList = async () => {
    try {
      const response = await fetch(`${backendUrl}/users/${user._id}/properties`, {
        method: "GET"
      })
      const data = await response.json()
      console.log(data)
      (setpropertyList(data))
      setLoading(false)
    } catch (err) {
      console.log("Fetch all properties failed", err.message)
    }
  }

  useEffect(() => {
    getPropertyList()
  }, [])

  return loading ? <Loader /> : (
    <>
      <Navbar />
      <h1 className="title-list">Your Property List</h1>
      <div className="list">
        {propertyList?.map(
          ({
            _id,
            creator,
            listingPhotoPaths,
            city,
            province,
            country,
            category,
            type,
            price,
            promoted = false,
          }) => (
            <ListingCard
              listingId={_id}
              creator={creator}
              listingPhotoPaths={listingPhotoPaths}
              city={city}
              province={province}
              country={country}
              category={category}
              type={type}
              price={price} 
              promoted = {promoted}
            />
          )
        )}
      </div>

      <Footer />
    </>
  );
};

export default PropertyList;
