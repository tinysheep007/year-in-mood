// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import "../Style/NavbarStyle.scss"

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className="navbar-container">
        <div className="navbar-title">
          <Link to="/">Year In Mood</Link>
        </div>
        <div className="navbar-links">
          <Link to="/Home">Home</Link>
          <Link to="/analysis">Data Analysis</Link>
          <Link to="/instructions">Instructions</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
