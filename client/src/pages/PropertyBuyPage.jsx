import React, { useEffect, useState } from "react"; 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ListingCard from "../components/ListingCard";
import Loader from "../components/Loader";
import "../styles/PropertyBuyPage.css";
 
const OpenSidebarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="icon-open">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const CloseSidebarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="icon-close">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const AllProperties = () => {
  const backendUrl = process.env.REACT_APP_BASE_BACKEND_URL;

  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({
    city: "",
    pincode: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    type: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(20);

  const fetchProperties = async () => {
    try {
      const response = await fetch(`${backendUrl}/properties/property-search`);
      if (!response.ok) {
        throw new Error("Failed to fetch listings");
      }
      const data = await response.json();
      setProperties(data);
      setFilteredProperties(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching properties:", err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);


  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilterClear = () => {
    setFilters({
      city: "",
      pincode: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      type: "",
    });
  };

  useEffect(() => {
    let filtered = properties;

    if (filters.city) {
      filtered = filtered.filter((property) =>
        property.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    if (filters.category) {
      filtered = filtered.filter((property) => property.category === filters.category);
    }

    if (filters.type) {
      filtered = filtered.filter((property) => property.buyOrSell === filters.type);
    }

    if (filters.minPrice) {
      filtered = filtered.filter((property) => property.price >= filters.minPrice);
    }

    if (filters.maxPrice) {
      filtered = filtered.filter((property) => property.price <= filters.maxPrice);
    }

    if (filters.pincode && filters.pincode.length >= 6) {
      filtered = filtered.filter((property) => property.pincode === parseInt(filters.pincode));
    }

    setFilteredProperties(filtered);
  }, [filters, properties]);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 20);
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div className="property-list-section">
        <div className="bgApply">
          <div className="section-header-buy">
            <h1 className="heading">Discover Your Dream Property</h1>
            <p className="subheading-buy">Explore the latest listings of homes, apartments, and villas.</p>
          </div>


          <div className="togglebtn">
        <span className="tip-section-span" >Apply filter</span>
          <button className="toggle-filter-btn" onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? <CloseSidebarIcon /> : <OpenSidebarIcon />}
          </button>
        </div>
        </div>
        <div className={`property-grid-wrapper ${showFilters ? "with-sidebar" : "full-width"}`}>
          
          <div className="property-grid">
            {filteredProperties.slice(0, visibleCount).map((property) => (
              <ListingCard
                key={property._id}
                className="listing-card"
                listingId={property._id}
                creator={property.creator}
                photos={property.listingPhotos}
                city={property.city}
                pincode={property.pincode}
                country={property.country}
                category={property.category}
                type={property.type}
                buyOrSell={property.buyOrSell}
                price={property.price}
                paymentType={property.paymentType}
                promoted={property.promoted}
              />
              
            ))}

          </div>

          {showFilters && (
            <div className={`filter-sidebar ${showFilters ? "show-filters" : "hide-filters"}`}>
              <div className="filter-header">
                <h2>Filters</h2>
              </div>
              <div className="filter-content">
                <div className="filter-group">
                  <label htmlFor="city">City:</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={filters.city}
                    onChange={handleFilterChange}
                    placeholder="Enter city"
                  />
                </div>
                <div className="filter-group">
                  <label htmlFor="pincode">Pincode:</label>
                  <input
                    type="number"
                    id="pincode"
                    name="pincode"
                    value={filters.pincode}
                    onChange={handleFilterChange}
                    placeholder="Enter Pincode"
                  />
                </div>
                <div className="filter-group">
                  <label htmlFor="category">Category:</label>
                  <select
                    id="category"
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                  >
                    <option value="">All</option>
                    <option value="House">House</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Rooms">Rooms</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label htmlFor="type">Type:</label>
                  <select
                    id="type"
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                  >
                    <option value="">All</option>
                    <option value="Buy">Buy</option>
                    <option value="Rent">Rent</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label htmlFor="minPrice">Min Price:</label>
                  <input
                    type="number"
                    id="minPrice"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    placeholder="₹ Min Price"
                  />
                </div>
                <div className="filter-group">
                  <label htmlFor="maxPrice">Max Price:</label>
                  <input
                    type="number"
                    id="maxPrice"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    placeholder="₹ Max Price"
                  />
                </div>
                <button onClick={handleFilterClear} className="clear-filters-button">
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {visibleCount < filteredProperties.length && (
          <button onClick={handleShowMore} className="show-more-button">
            Show More
          </button>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AllProperties;
