import React from "react";
import mainStoryImage from '../../../assets/image-web-3-desktop.jpg'
import styles from "./MainStory.css"

function MainStory() {
  return (
    <div className="main-story-container">
      <img className="main-story-img" src={mainStoryImage} alt="main story image"/>
      <div className="main-story-text">
        <h1>The Bright Future of Web 3.0?</h1>
        <div className="main-story-description-button-container">
          <p className="main-story-description">We dive into the next evolution of the web that claims to put the power of the platforms back into the hands of the people. But is it really fulfilling its promise?</p>
          <button>READ MORE</button>
        </div>
      </div>
    </div>
  );
}

export default MainStory;
