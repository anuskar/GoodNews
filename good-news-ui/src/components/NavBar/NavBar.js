import React from 'react';
import { Link } from 'react-router-dom'; 
import styles from './NavBar.css'

function Navbar(props) {
  return (
    <nav className="nav-bar">
     <div className="nav-brand">
        <Link to="/">GOODNEWS.</Link> 
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link> 
        </li>
        {props.userTopics && Object.keys(props.userTopics).map((topicKey) => (
          <li key={topicKey}>
            <Link to={`/newsbytopic/${props.userTopics[topicKey]}`}>{props.userTopics[topicKey]}</Link>
          </li>
        ))}
        <li>
          <Link to="/account">Account</Link>
        </li>
        {/* Add more navigation links as needed */}
      </ul>
    </nav>
  );
}

export default Navbar;
