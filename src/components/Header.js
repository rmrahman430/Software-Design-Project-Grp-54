import React from 'react';
import { Link } from "react-router-dom";
import logo from '../assets/oilrig.png';

const Header = () => {
    return (
        <header>
            <div className="websiteName">
                <Link to="/about-us">group name</Link>
            </div>

            <div className="logo">
                <Link to="/about-us">
                    <img src={logo} alt="logo"/>
                </Link>
            </div>

            <nav>
                <ul>
                    <li>
                        <Link to="/fuel-quote">Fuel Quote</Link>
                    </li>
                    <li>
                        <Link to="/login">Login/Signup</Link>
                    </li>
                    <li>
                        <Link to="/fuel-quote-history">Fuel Quote History</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
