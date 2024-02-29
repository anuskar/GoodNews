import React, { useState, useEffect } from "react";
import styles from "./TrendingStories.css";
import mainStoryImage from "../../../assets/image-web-3-desktop.jpg";
import trendingStoriesData from "./trendingStories.json";

function TrendingStories() {
  const [trendingStories, setTrendingStories] = useState([]);

  useEffect(() => {
    setTrendingStories(
        trendingStoriesData.map((story) => ({
        ...story,
        img: mainStoryImage,
      }))
    );
  }, []);

  const data = trendingStories.map((item) => {
    return (
      <div className="trending-story">
        <img src={item.img} alt="main story image" />
        <div className="trending-story-text">
          <h3>{item.number}</h3>
          <h4>{item.title}</h4>
          <p>{item.paragraph}</p>
        </div>
      </div>
    );
  });

  return <div className="trending-stories-container">{data}</div>;
}

export default TrendingStories;
