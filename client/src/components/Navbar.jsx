import React, {  useState } from "react";
import { Search } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { setLogout } from "../redux/state";
import { MdDashboardCustomize } from "react-icons/md";
import { TbBuildingEstate,TbLogout,TbLogin  } from "react-icons/tb";
import { GiArchiveRegister } from "react-icons/gi";
import { FaHandsHelping } from "react-icons/fa";
  
import "../styles/Navbar.css";

const Navbar = ( getSearchListings) => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [search, setSearch] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 760 });

  const [isOpen, setIsOpen] = useState(false);
 
  const toggleMobileMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
    setDropdownMenu(prev => !prev);  
  };
 
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && search.trim()) {
      navigate(`/properties/search/${search}`);
      getSearchListings(search);  
    }
  };
   

  return (
    <div className="navbar">
  
      <Link to="/" className="logo">
        RentSmart
      </Link>

      {/* Search Bar (Hidden on Mobile) */}
      {!isMobile && (
        <div className="navbar_search">
          <input
            type="text"
            onKeyDown={handleKeyDown }
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="search_btn"
            disabled={search === ""}
            onClick={() => navigate(`/properties/search/${search}`)}
          >
            <Search />
          </button>
        </div>
      )}
 
      {!isMobile && (
        <div className="navbar_right">
          {user ? (
          
            <Link to="/dashboard" className="host an">
                <div className="dashboard-withIcon">
              <span className="dash-text"> Dashboard</span>  <MdDashboardCustomize/>
              </div>
            </Link>
           
           
          ) : (
            <Link to="/login" className="host an">
              Login for Being Seller<span style={{position:'relative',top:'3px'}}>  <TbLogin/> </span>
            </Link>
          )}

          <div className="navbar_links">
            {user ? (
              <> 
                <div className="dropdown">
                  <button
                    className="dropdown_button"
                    onClick={() => setDropdownMenu((prev) => !prev)}
                  >
                     <div className="dashboard-withIcon">
                   <span className="dash-text"> Administer</span> <TbBuildingEstate/>
                    </div>
                  </button>
                  {dropdownMenu && (
                    <div className="dropdown_content">
                      <Link to="/property-search" >
                        Buy Property
                      </Link>
                      <Link to="/create-listing" >
                        Sell your Property
                      </Link>
                      <Link to="/create-listing" >
                        Rent Property
                      </Link>
                      <Link to="/property-search" >
                        Take Property on Rent
                      </Link>
                    </div>
                  )}
                </div>
                <Link
                  to="/login"
                  onClick={() => dispatch(setLogout())}
                  
                > 
                Log Out <span style={{position:'relative',top:'2px'}}>  <TbLogout/> </span>  
                 
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" > 
                  Log In<span style={{position:'relative',top:'3px'}}> <TbLogin/> </span>
                   
                </Link>
                <Link to="/register" >
                  Sign Up <span style={{position:'relative',top:'3px'}}><GiArchiveRegister/></span>
                </Link>
                <Link to="/help" >
                  Help <span style={{position:'relative',top:'3px'}}><FaHandsHelping/> </span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Mobile Toggle Button */}
      {isMobile && (
        <div className="mobile_nav">
          <button className="navbar_toggle" onClick={toggleMobileMenu}>
            <img src={isOpen ? "assets/close.svg" : "assets/menu.svg"} alt="toggle" />
          </button>

          {dropdownMenu && (
            <div className="mobile_menu">
              <div className="mobile_links">
                {user ? (
                  <>
                    <Link to="/dashboard" >
                    <div className="dashboard-withIcon">
              <span className="dash-text"> Dashboard</span>  <MdDashboardCustomize/>
              </div>
                    </Link>
                 
                        <div className="dropdown_content-mobile">
                          <Link to="/property-search" >
                            Buy Property
                          </Link>
                          <Link to="/create-listing" >
                            Sell your Property
                          </Link>
                          <Link to="/create-listing" >
                            Rent Property
                          </Link>
                          <Link to="/property-search" >
                            Take Property on Rent
                          </Link>
                        </div>
                  
                    <Link
                      to="/login"
                      onClick={() => dispatch(setLogout())}
                      
                    >
                       <div className="dashboard-withIcon">
                     <span className="dash-text" > Log Out</span> <TbLogout/>
                     </div>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/login" > 
                  Log In<span style={{position:'relative',top:'3px'}}> <TbLogin/> </span>
                   
                </Link>
                <Link to="/register" >
                  Sign Up <span style={{position:'relative',top:'3px'}}><GiArchiveRegister/></span>
                </Link>
                <Link to="/help" >
                  Help <span style={{position:'relative',top:'3px'}}><FaHandsHelping/> </span>
                </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
