import React, { useEffect, useState } from 'react';

function Newsletter() {
  const [articles, setArticles] = useState([]);

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
        setArticles(data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Newsletter</h1>
      {articles.map((a, index) => (
        <div key={index}>
          <h2>{a.title}</h2>
          <p>{a.article}</p>
          <a href={a.link}>Read more</a>
        </div>
      ))}
    </div>
  );
}

export default Newsletter;
