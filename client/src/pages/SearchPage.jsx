import { useParams } from "react-router-dom";
import "../styles/List.css"
import { useSelector,useDispatch  } from "react-redux";
import { setListings } from "../redux/state";
import { useEffect, useState } from "react";
import Loader from "../components/Loader"
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer"

const SearchPage = () => {
  const [loading, setLoading] = useState(true)
  const { search } = useParams()
  const listings = useSelector((state) => state.listings)
  const dispatch = useDispatch()
  const backendUrl = process.env.REACT_APP_BASE_BACKEND_URL;

  const getSearchListings = async () => {
    try {
      const response = await fetch(`${backendUrl}/properties/search/${search}`, {
        method: "GET"
      })

      const data = await response.json()
 
      dispatch(setListings({ listings: data }))
      setLoading(false)
    } catch (err) {
      console.log("Fetch Search List failed!", err.message)
    }
  }

  useEffect(() => {
    getSearchListings()
  }, [search])

  
  
  return loading ? <Loader /> : (
    <>
      <Navbar getSearchListings={getSearchListings} />
      <h1 className="title-list">{search}</h1>
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
            highlightDesc,
            promoted = false
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
              promoted = {promoted}
            />
          )
        )}
      </div>
      <Footer />
    </>
  );
  
}

export default SearchPage