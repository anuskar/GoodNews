import React, { useState, useEffect } from "react";
import styles from "./NewsByTopic.css"; // Assuming CSS is in the same folder

function NewsByTopic(props) {
  const [stories, setStories] = useState([]);
  const topic = props.topic

  useEffect(() => {
    fetch("/getMostRelevant_byQuery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic: topic }), // Send the topic in the request body
    })
      .then((response) => response.json())
      .then((data) => {
        setStories(data); // Assuming the backend returns an object with a 'stories' key
      })
      .catch((error) => console.error("Error fetching stories:", error));
  }, [topic]); // Dependency array includes topic to refetch when it changes

  const data = stories.map((story, index) => {
    console.log("story: ", story);
    const handleTitleClick = () => {
      // Assuming 'item.url' is the property that contains the URL
      if (story.url) {
        window.open(story.url, "_blank"); // '_blank' opens the URL in a new tab
      }
    };
    return (
      <div key={index} className="news-story">
        <img src={story.image} alt="story" />
        <div className="news-story-text">
          <h4 onClick={handleTitleClick}>{story.title}</h4>
          <p>
            {story.body.length > 100
              ? `${story.body.slice(0, 100)}...`
              : story.body}
          </p>
        </div>
      </div>
    );
  });

  return <div className="news-grid-container">{data}</div>;
}

export default NewsByTopic;
