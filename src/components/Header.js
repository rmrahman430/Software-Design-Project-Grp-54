//Header.js
import React from 'react';
import { Link } from "react-router-dom";
 
const Header = () => {
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
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <Link to="/login">Login/Signup</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
