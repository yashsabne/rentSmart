import React, { useState } from "react";
import { Search } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { setLogout } from "../redux/state";
import { MdDashboardCustomize } from "react-icons/md";
import { TbBuildingEstate, TbLogout, TbLogin } from "react-icons/tb";
import { GiArchiveRegister } from "react-icons/gi";
import { FaHandsHelping } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";

import "../styles/Navbar.css";

const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [search, setSearch] = useState("");
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 960 });



  const [isOpen, setIsOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
    setDropdownMenu(prev => !prev);
  };




  return (
    <div className="navbar">

      <Link to="/" className="logo">
        RentSmart
      </Link>

      {!isMobile && (
        <div className="navbar_search">
          <input
            type="text"
            placeholder="Search..For now (house, rooms, apartment, etc)"
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

            <>
              <Link to="/" className="host an">
                <div className="dashboard-withIcon">
                  <span className="dash-text"> Home</span>  <IoHomeOutline />
                </div>
              </Link>

              <Link to="/dashboard" className="host an">
                <div className="dashboard-withIcon">
                  <span className="dash-text"> Dashboard</span>  <MdDashboardCustomize />
                </div>
              </Link>

            </>


          ) : (
            <Link to="/login" className="host an">
              Login for Being Seller<span style={{ position: 'relative', top: '3px' }}>  <TbLogin /> </span>
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
                      <span className="dash-text"> Administer</span> <TbBuildingEstate />
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
                  Log Out <span style={{ position: 'relative', top: '2px' }}>  <TbLogout /> </span>

                </Link>
              </>
            ) : (
              <>
                <Link to="/login" >
                  Log In<span style={{ position: 'relative', top: '3px' }}> <TbLogin /> </span>

                </Link>
                <Link to="/register" >
                  Sign Up <span style={{ position: 'relative', top: '3px' }}><GiArchiveRegister /></span>
                </Link>
                <Link to="/help" >
                  Help <span style={{ position: 'relative', top: '3px' }}><FaHandsHelping /> </span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {isMobile && (
        <div className="mobile_nav">
          <button className="navbar_toggle" onClick={toggleMobileMenu}>
            <img src={isOpen ? "https://icons.veryicon.com/png/o/business/process-bank-portal-project-phase-iii/close-tab-bar.png" : "https://i.pinimg.com/originals/26/9d/d1/269dd16fa1f5ff51accd09e7e1602267.png"} alt="toggle btn" />
          </button>

          {dropdownMenu && (
            <div className="mobile_menu">
              <div className="mobile_links">
                {user ? (
                  <>
                    <Link to="/" className="host an">
                      <div className="dashboard-withIcon">
                        <span className="dash-text"> Home</span>  <IoHomeOutline />
                      </div>
                    </Link>
                    <Link to="/dashboard" >
                      <div className="dashboard-withIcon">
                        <span className="dash-text"> Dashboard</span>  <MdDashboardCustomize />
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
                        <span className="dash-text" > Log Out</span> <TbLogout />
                      </div>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/login" >
                      Log In<span style={{ position: 'relative', top: '3px' }}> <TbLogin /> </span>

                    </Link>
                    <Link to="/register" >
                      Sign Up <span style={{ position: 'relative', top: '3px' }}><GiArchiveRegister /></span>
                    </Link>
                    <Link to="/help" >
                      Help <span style={{ position: 'relative', top: '3px' }}><FaHandsHelping /> </span>
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
