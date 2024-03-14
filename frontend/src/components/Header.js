import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const Header = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const { data } = await axios.post("http://localhost:4000/profile", {}, { withCredentials: true });
                if (data.status) {
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
    }, [loggedIn]); // Add loggedIn as dependency

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <header>
            <li> <Link to="/about-us"> group name </Link> </li>
        
            <nav>
                <ul>
                    <li>
                        <Link to="/fuel-quote">Fuel Quote</Link>
                    </li>
                    <li>
                        <Link to="/fuel-quote-history">Fuel Quote History</Link>
                    </li>
                    {loggedIn ? (
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                    ) : (
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
