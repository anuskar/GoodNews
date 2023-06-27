import React, { useEffect, useState } from 'react';
import { Box, Typography, Link } from '@mui/material';
import { css } from '@emotion/react';
import styles from './Article.module.css'


function Article({article}) {

//    const articleBoxStyles = css`
//     padding: 50px;
//     text-align: center;
//     color: #000;
//     margin: 20px;
//     border: 1px solid black;
//   `;

//   const articleTitleStyles = css`
//     font-size: 20px;
//     font-weight: bold;
//     margin-bottom: 8px;
//   `;

//   const articleContentStyles = css`
//     font-size: 14px;
//     margin-bottom: 8px;
//   `;

  return (
      <div>
         <Box sx={{padding: '50px',color:'#000', margin: '20px', border: '1px solid black'}}>
            <Typography className = "articleTitleStyles" variant="h6" component="h2">
               {article.title}
            </Typography>
            <Typography className = "articleContentStyles" variant="body2" component="p">
               {article.article.length > 100 ? `${article.article.slice(0, 100)}...` : article.article}
            </Typography>
            <Link href={article.link} color="primary">
               Read more
            </Link>
         </Box>
      </div>
  );
}

export default Article;







// /** @jsxImportSource @emotion/react */
// import React from 'react';
// import PropTypes from 'prop-types';
// import { Grid, Box, Typography, Link, Paper } from '@mui/material';
// import { css } from '@emotion/react';
// import { ArticleWrapper, articleBoxStyles, articleTitleStyles, articleContentStyles } from './Article.styled';

// const Article = ({ article }) => (
//    <ArticleWrapper>
//       <articleBoxStyles>
//          <articleTitleStyles>
//             {article.title}
//          </articleTitleStyles>
//          <articleContentStyles>
//             {article.article.length > 100 ? `${article.article.slice(0, 100)}...` : article.article}
//          </articleContentStyles>
//          <Link href={article.link} color="primary">
//             Read more
//          </Link>
//       </articleBoxStyles>
//    </ArticleWrapper>
// );

// // Article.propTypes = {title, article, link};

// // Article.defaultProps = {};

