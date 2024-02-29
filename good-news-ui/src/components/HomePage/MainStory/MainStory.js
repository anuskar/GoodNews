import React, {useState, useEffect} from "react";
import mainStoryImage from '../../../assets/image-web-3-desktop.jpg'
import styles from "./MainStory.css"
import mainStoryData from "./mainStory.json";


function MainStory() {
  const [mainStory, setMainStory] = useState([]);

  useEffect(() => {
    setMainStory(
      mainStoryData.map((story) => ({
        ...story,
      }))
    );
  }, []);

  const data = mainStory.map((item) => {
    return (
      <div className="main-story-text">
        <h1>{item.title}</h1>
        <div className="main-story-description-button-container">
          <p className="main-story-description">{item.paragraph}</p>
          <button>READ MORE</button>
        </div>
      </div>
    )
  })


  return (
    <div className="main-story-container">
      <img className="main-story-img" src={mainStoryImage} alt="main story image"/>
      {data}
    </div>
  );
}

export default MainStory;
