import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IoMdFootball } from 'react-icons/io';
import { useNavigate, Link } from 'react-router-dom';

import { findLeagueId } from '../../helperFunctions';
import "./navbar.css";
import { useAuth, logOutUser } from '../../firebase';




const Navbar = ({ fetchLeagueTable }) => {

    // Value being searched for in search bar
    const [searchValue, setSearchValue] = useState("");

    // Get current user if logged in
    const currentUser = useAuth();

    // React-router-dom Method for pushing to different page
    const history = useNavigate()



    // Toggle value for opening and closing mobile menu
    const [toggle, setToggle] = useState(false);

    // Methods for toggling and closing mobile menu
    const handleToggle = () => setToggle(!toggle);
    const handleClose = () => setToggle(false);




    // Handle search functionality
    const handleSearch = e => {
        e.preventDefault();
        // Find the leagueId
        const searchId = findLeagueId(searchValue);
        // Fetch the league info and table
        fetchLeagueTable(searchId);
        // Close the mobile menu if opened
        handleClose();
    };


    
    // Method for logging out User
    const handleLogOut = async e => {
        e.preventDefault();

        try {
            // LogOut User - Functionality imported from Firebase.js
            await logOutUser();

        } catch {
            // Throw an alert if there were any problems - NB! fill out more later
            alert("There was a problem");
        }
    };



    
    return (
        <div className='navbar'>
            <div className="navbar_wrapper">
                <div className="navbar_container container">

                    {/* Logo Section */}
                    <div className="navbar_logo" onClick={handleClose}>
                        <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
                            <IoMdFootball className="navbar_icon" />
                            Football App
                        </Link>
                    </div>
                    

                    {/* Icon for toggling the Mobile Menu - hidden unless small screen */}
                    <div className="navbar_toggle" onClick={handleToggle}>
                        {toggle ? <FaTimes className='navbar_toggle_icon1' /> : <FaBars className='navbar_toggle_icon2' />}
                    </div>


                    {/* Search Bar and Links - Put as a list for mobile menu */}
                    <ul className={toggle ? "nav_section active" : "nav_section"}>
                        
                        {/* Search Bar - button is hidden to allow submit by pressing enter */}
                        <li className='searchbar_container'>
                            <form>
                                <input
                                    className='searchbar' type="text" placeholder='Search for League' value={searchValue}
                                    onChange={e => setSearchValue(e.target.value)}
                                />
                                <button onClick={handleSearch} type='submit' style={{ display: "none" }}></button>
                            </form>
                        </li>

                        {/* Live Scores Link */}
                        <li className="link_container" onClick={handleClose}>
                            <div className="link">
                                Live Scores
                            </div>
                        </li>

                        {/* Live Standings Link */}
                        <li className="link_container" onClick={handleClose}>
                            <div className="link">
                                Standings
                            </div>
                        </li>

                        {/* Top Scorers Link */}
                        <li className="link_container" onClick={handleClose}>
                            <div className="link">
                                Top Scorers
                            </div>
                        </li>


                        {/* Log In / Log Out Button */}
                        <li onClick={handleClose} className="signup_container">
                            {currentUser ? (
                                <button className="signup_button" onClick={handleLogOut}>
                                    Log Out
                                </button>
                            ) : (
                                <button className="signup_button" onClick={() => history("/login")}>
                                    Log In
                                </button>
                            )}
                            
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;