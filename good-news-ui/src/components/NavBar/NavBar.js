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
          <Link to="/newsbytopic">Sports</Link>
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
