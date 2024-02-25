import React from 'react';
import { Link } from 'react-router-dom'; 
import styles from './NavBar.css'

function Navbar() {
  return (
    <nav className="nav-bar">
     <div className="nav-brand">
        <Link to="/">GOODNEWS.</Link> 
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link> 
        </li>
        <li>
          <Link to="/newsletter">Newsletter</Link>
        </li>
        <li>
          <Link to="/popular">Popular</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        {/* Add more navigation links as needed */}
      </ul>
    </nav>
  );
}

export default Navbar;
