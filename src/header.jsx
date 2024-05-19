import React from "react";
import './App.css';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className="header-container">
            <div className="header-text">
                <Link to="/Page2" className="header-link">
                    <h1 className="header-title">Jelajahi Makanan Nusantara</h1>
                </Link>
                <p className="header-description">Temukan berbagai kuliner lezat dari berbagai daerah di Indonesia</p>
            </div>
        </div>
    );
}

export default Header;
