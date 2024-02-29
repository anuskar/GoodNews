import React, { useState, useEffect } from "react";
import styles from "./NewStories.css";
import newStoriesData from "./newStories.json";


function NewStories() {
  const [newStories, setNewStories] = useState([]);

  useEffect(() => {
    setNewStories(
        newStoriesData.map((story) => ({
        ...story,
      }))
    );
  }, []);

  const data = newStories.map((item) => {
    return (
        <div className="new-stories-text">
            <h2>{item.title}</h2>
                <p>{item.paragraph}</p>
            <hr />
        </div>
    )
  })

  return (
    <div className="new-stories-container">
      <h1>New</h1>
      {data}
    </div>
  );
}

export default NewStories;
