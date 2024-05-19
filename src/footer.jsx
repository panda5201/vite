import React from "react";
import './App.css';
import { Link } from "react-router-dom";

function Footer(){
    const handleMapLinkClick = () => {
  
      fetchCulinaryLocations();
    };
  
    const fetchCulinaryLocations = () => {
      const clientId = 'TPCNGFKQX12S0DPUK0AZFZYJLLXMNCKHEC50OC1BWQDEK2CS';
      const clientSecret = 'V1RBLNIFF4OS4XWPB3KQ0U4UBM03BXUIT41TQANHJSKUU1Z3';
      const near = 'Jakarta'; 
  
      fetch(`https://api.foursquare.com/v2/venues/explore?client_id=${clientId}&client_secret=${clientSecret}&near=${near}&v=20240101`, {
        method: 'GET',
      })
      .then(response => response.json())
      .then(data => {
        
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    };
  
    return (
      <div className="footer-container">
        <Link to="/Aboutus" >
          <h3>About Us</h3>
        </Link>
        <footer className="footer-text">
          Â© 2024 Jelajahi Makanan Nusantara. All rights reserved.
        </footer>
      </div>
    );
  }

  export default Footer;