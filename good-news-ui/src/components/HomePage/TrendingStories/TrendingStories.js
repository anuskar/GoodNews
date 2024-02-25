import React from 'react';
import styles from './TrendingStories.css'
import mainStoryImage from '../../../assets/image-web-3-desktop.jpg'


function TrendingStories(){
    return (
        <div className='trending-stories-container'>
            <div className='trending-story'>
                <img src={mainStoryImage} alt="main story image"/>
                <div className='trending-story-text'>
                    <h3>01</h3>
                    <h4>Reviving Retro PCs</h4>
                    <p>What happens when old PCs are given modern upgrades?</p>
                </div>
            </div>
            <div className='trending-story'>
                <img src={mainStoryImage} alt="main story image"/>
                <div className='trending-story-text'>
                    <h3>02</h3>
                    <h4>Reviving Retro PCs</h4>
                    <p>What happens when old PCs are given modern upgrades?</p>
                </div>
            </div>
            <div className='trending-story'>
                <img src={mainStoryImage} alt="main story image"/>
                <div className='trending-story-text'>
                    <h3>03</h3>
                    <h4>Reviving Retro PCs</h4>
                    <p>What happens when old PCs are given modern upgrades?</p>
                </div>
            </div>
            <div className='trending-story'>
                <img src={mainStoryImage} alt="main story image"/>
                <div className='trending-story-text'>
                    <h3>04</h3>
                    <h4>Reviving Retro PCs</h4>
                    <p>What happens when old PCs are given modern upgrades?</p>
                </div>
            </div>
        </div>
    )
}

export default TrendingStories;
