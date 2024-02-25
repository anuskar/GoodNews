import React, { useEffect, useState } from 'react';
import { Box, Typography, Link } from '@mui/material';
import { css } from '@emotion/react';
import styles from './Article.module.css'
// import myImg from './download.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons';


export default function Article({article}) {
  return (
      <div>
         {/* <Box sx={{padding: '50px',color:'#000', margin: '20px', border: '1px solid black'}}>
            <Typography className = "articleTitleStyles" variant="h6" component="h2">
               {article.title}
            </Typography>
            <Typography className = "articleContentStyles" variant="body2" component="p">
               {article.article.length > 100 ? `${article.article.slice(0, 100)}...` : article.article}
            </Typography>
            <Link href={article.link} color="primary">
               Read more
            </Link>
         </Box> */}
         {/* <div class="article-card-container">
            <img class="article-img" src={myImg}/>
            <div class="article-body-container">
               <h3 className="article-title">{article.title}</h3>
               <p className="article-body">{article.article.length > 200 ? `${article.article.slice(0, 200)}...` : article.article}</p>
               <div className="article-details-container">
                  <p className="article-date">2 hours ago</p>
                  <p className="article-author">By John Smith | </p>
                  <p className="article-read-time">4 min read</p>
               </div>
            </div>
            <div className="article-icon-container">
               <button className="article-fav"><FontAwesomeIcon icon={faHeart}/></button>
               <button className="article-save"><FontAwesomeIcon icon="bookmark"/></button>
            </div>
         </div> */}
         <p>hi</p>
      </div>
  );
}
