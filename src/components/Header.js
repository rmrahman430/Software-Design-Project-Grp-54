import React from 'react'; 
import { Link } from "react-router-dom";
import logo from '../assets/oilrig.png';

const Header = () => {
    return (
        <header>
        <div className="websiteName"> 
            <Link to ="/"> group name </Link>
        </div>

        <div className="logo">
            <Link to ="/">
                <img src={logo} alt="logo"/>
            </Link>
        </div>
        
            <nav> 
                <li> 
                    <Link to ="/fuel"> fuel quote </Link>
                </li>
                <li> 
                    <Link to ="/login"> login/signup </Link>
                </li>
            </nav>
        </header>

    );
};

export default Header; 