import React, { useState, useEffect } from "react";
import mainStoryImage from "../../../assets/image-web-3-desktop.jpg";
import styles from "./MainStory.css";
import mainStoryData from "./mainStory.json";

function MainStory(props) {
  const [mainStory, setMainStory] = useState(
    [props.mostRelevantStory].filter(Boolean)
  );

  useEffect(() => {
    // Assuming you might want to update the state based on props update
    if (props.mostRelevantStory) {
      setMainStory([props.mostRelevantStory]);
    }
  }, [props.mostRelevantStory]); // React to changes in props.mostRelevantStory

  const data = mainStory.map((item, index) => {
    return (
      <div>
        <img className="main-story-img" src={item.image} alt="main story image" />

        <div className="main-story-text">
          <h1>{item.title}</h1>
          <div className="main-story-description-button-container">
            <p className="main-story-description">
              {item.body.length > 150
                ? `${item.body.slice(0, 150)}...`
                : item.body}
            </p>
            <button>READ MORE</button>
          </div>
        </div>
      </div>
    );
  });

  return <div className="main-story-container">{ data }</div>;
}

export default MainStory;
