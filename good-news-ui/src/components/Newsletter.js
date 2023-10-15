import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Link, Paper } from '@mui/material';
import { css } from '@emotion/react';
import Article from './Article/Article';
import Card from './Card/Card'
import MainArticleCard from './MainArticleCard/MainArticleCard';


function Newsletter() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/goodnews', {
        method: 'POST',
        body: JSON.stringify({ person: 'John Doe' }), // replace 'John Doe' with the person name you want to get the newsletter for
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        setCards(data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className='newsletter-container'>
      <MainArticleCard card={cards[0]}/>
      <Grid className='card-grid'container spacing={2}>
        {cards.map((a, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card card={a}/>
          </Grid>
        ))}
      </Grid>
    </div>

  );
}


export default Newsletter;


    // <Box sx={{ padding: '1rem' }}>
    //   <Typography variant="h4" gutterBottom>
    //     Good News!
    //   </Typography>

    //   <Grid container spacing={2}>
    //     {articles.map((a, index) => (
    //       <Grid item xs={12} sm={6} md={4} key={index}>
    //         <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '4px', height: '100%' }}>
    //           <Typography variant="h5">{a.title}</Typography>
    //           <Typography variant="body1" sx={{ mt: 1, mb: 2, maxHeight: '6rem', overflow: 'hidden' }}>
    //             {a.article.length > 100 ? `${a.article.slice(0, 100)}...` : a.article}
    //           </Typography>
    //           <Link href={a.link} variant="body2">
    //             Read more
    //           </Link>
    //         </Box>
    //       </Grid>
    //     ))}
    //   </Grid>
    // </Box>
    // <div>
    //   <h1>Good News!</h1>
    //   {articles.map((a, index) => (
    //     <div key={index}>
    //       <h2>{a.title}</h2>
    //       <p>{a.article}</p>
    //       <a href={a.link}>Read more</a>
    //     </div>
    //   ))}
    // </div>