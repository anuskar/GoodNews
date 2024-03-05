import React, {useState, useEffect} from 'react';
import MainStory from './MainStory/MainStory'
import NewStories from './NewStories/NewStories'
import TrendingStories from './TrendingStories/TrendingStories'
import styles from './HomePage.css'

function HomePage(){
    const [relevantStories, setRelevantStories] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/getMostRelevant', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => response.json())
          .then(data => {
            setRelevantStories(data);
          })
          .catch(error => console.error(error));
      }, []);


    return (
        <div className='homepage-container'>
            <div className='main-news-container'>
                <MainStory mostRelevantStory={relevantStories[0]}></MainStory>
                <NewStories></NewStories>
            </div>
            <TrendingStories mostTrendingStories={relevantStories.slice(1)}></TrendingStories>
        </div>
    )
}

export default HomePage;
