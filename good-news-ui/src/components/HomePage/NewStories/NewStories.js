import React, { useState, useEffect } from "react";
import styles from "./NewStories.css";
import newStoriesData from "./newStories.json";


function NewStories() {
  const [newStories, setNewStories] = useState([]);

  // useEffect(() => {
  //   setNewStories(
  //       newStoriesData.map((story) => ({
  //       ...story,
  //     }))
  //   );
  // }, []);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/getLatest', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        setNewStories(data);
      })
      .catch(error => console.error(error));
  }, []);

  const data = newStories.map((item) => {
    return (
        <div className="new-stories-text">
            <h2>{item.title}</h2>
                <p>{item.body.length > 50
                ? `${item.body.slice(0, 50)}...`
                : item.body}</p>
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
