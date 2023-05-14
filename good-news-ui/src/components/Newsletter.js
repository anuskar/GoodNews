import React, { useState } from 'react';

function Newsletter() {
  const [newsletter, setNewsletter] = useState("");

  const fetchNewsletter = async () => {
    const response = await fetch('http://127.0.0.1:5000/newsletter', {
      method: 'POST',
      body: new URLSearchParams({
        person: 'John Doe', // Replace with the person's name
      }),
    });
    const data = await response.json();
    setNewsletter(data);
  };

  return (
    <div>
      <button onClick={fetchNewsletter}>Get Newsletter</button>
      <p>{newsletter}</p>
    </div>
  );
}

export default Newsletter;
