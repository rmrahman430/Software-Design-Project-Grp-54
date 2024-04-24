import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const Header = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const { data } = await axios.get("http://localhost:4000/checkAdmin", { withCredentials: true });
                setAdmin(data.user.admin);
                if (data.user) {
                    setLoggedIn(true);
                } else {
                    setLoggedIn(false);
                }
            } catch (error) {
                console.error("Error verifying user:", error);
                setLoggedIn(false);
            } finally {
                setLoading(false); // Set loading to false when request completes
            }
        };
        verifyUser();
    }, []); // Add loggedIn as dependency

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <header>
            <li> <Link to="/about-us"> group name </Link> </li>
        
            <nav>
                <ul>
                    {loggedIn && !admin ?  (
                        <li className="navLinks">
                            <Link to="/fuel-quote">Fuel Quote</Link>
                            <Link to="/fuel-quote-history">Fuel Quote History</Link>
                            <Link to="/profile">Profile</Link>
                        </li>
                    ) : loggedIn && admin ? ( 
                        <li className="navLinks">
                            <Link to="/report"> Report </Link>
                            <Link to="/profile">Profile</Link>
                        </li>
                    ) : (
                        <li className="navLinks">
                            <Link to="/login">Login</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
