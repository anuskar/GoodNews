import React, { useState, useEffect } from "react";
import styles from "./TrendingStories.css";

function TrendingStories(props) {
  const [trendingStories, setTrendingStories] = useState(props.mostTrendingStories.filter(Boolean));


  useEffect(() => {
    // Assuming you might want to update the state based on props update
    if (props.mostTrendingStories) {
      setTrendingStories(props.mostTrendingStories);
    }
  }, [props.mostTrendingStories]); // React to changes in props.mostRelevantStory

  const data = trendingStories.map((item, index) => {
    console.log(item)
    return (
      <div key={index} className="trending-story">
        <img src={item.image} alt="main story image" />
        <div className="trending-story-text">
          <h3>{index + 1}</h3>
          <h4>{item.title}</h4>
          <p>{item.body.length > 200 ? `${item.body.slice(0, 50)}...` : item.body}</p>
        </div>
      </div>
    );
  });

  return <div className="trending-stories-container">{data}</div>;
}

export default TrendingStories;
