import React from 'react';
import PropTypes from 'prop-types';
import { MainArticleCardWrapper } from './MainArticleCard.styled';
import myImg from './mountains.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons';

export default function MainArticleCard({card}){
   if (!card) {
      return null; // or render some placeholder content
    }
   return(
      <div>
         <div className="main-article-card-container">
            <img className="main-article-card-img" src={card.image}/>
            <div className="main-article-card-body-container">
               <div className="main-article-card-icon-container">
                  <button className="card-fav"><FontAwesomeIcon icon={faHeart}/></button>
                  <button className="card-save"><FontAwesomeIcon icon="bookmark"/></button>
               </div>
               <h3 className="main-article-card-title">{card.title}</h3>
               <p className="main-article-card-body">{card.body.length > 300 ? `${card.body.slice(0, 300)}...` : card.body}</p>
               <div className="main-article-card-details-container">
                  <p className="card-date">2 hours ago</p>
                  <p className="card-author">By Jane Smith | </p>
                  <p className="card-read-time">8 min read</p>
               </div>
            </div>
            
         </div>
      </div>
   )
}