import React from 'react';
import MainStory from './MainStory/MainStory'
import NewStories from './NewStories/NewStories'
import TrendingStories from './TrendingStories/TrendingStories'
import styles from './HomePage.css'

function HomePage(){
    return (
        <div className='homepage-container'>
            <div className='main-news-container'>
                <MainStory></MainStory>
                <NewStories></NewStories>
            </div>
            <TrendingStories></TrendingStories>
        </div>
    )
}

export default HomePage;
