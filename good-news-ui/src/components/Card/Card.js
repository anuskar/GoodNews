import React, { useEffect, useState } from 'react';
import { Box, Typography, Link } from '@mui/material';
import { css } from '@emotion/react';
// import styles from './card.module.css'
import myImg from './download.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons';


export default function Card({card}) {

   if (!card) {
      return null; // or render some placeholder content
    }

  return (
      <div>
         <div class="card-card-container">
            <img class="card-img" src={myImg}/>
            <div class="card-body-container">
               <h3 className="card-title">{card.title}</h3>
               <p className="card-body">{card.article.length > 200 ? `${card.article.slice(0, 200)}...` : card.article}</p>
               <div className="card-details-container">
                  <p className="card-date">2 hours ago</p>
                  <p className="card-author">By John Smith | </p>
                  <p className="card-read-time">4 min read</p>
               </div>
            </div>
            <div className="card-icon-container">
               <button className="card-fav"><FontAwesomeIcon icon={faHeart}/></button>
               <button className="card-save"><FontAwesomeIcon icon="bookmark"/></button>
            </div>
         </div>
      </div>
  );
}
