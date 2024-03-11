# Good News
 
## Overview

Good News is a refreshing take on the daily news cycle, designed to complement your usual news consumption with a dose of positivity. In a world where news platforms often bombard us with negative, polarizing, and depressing stories to drive views and engagement, Good News aims to balance the emotional scale. Good News focuses on delivering uplifting news about new technology, healthcare breakthroughs, and useful tips on time management and productivity, among others. It's a chance to bring more hope into our daily lives.

Good News leverages a powerful tech stack comprising React for the frontend, Python for the backend, MongoDB for database management, and FAISS for efficient similarity search in high-dimensional spaces. This combination enables us to offer a smooth and responsive user experience while effectively managing and delivering personalized content.

### Frontend Features

- **Homepage Component**: The entry point of Good News, featuring three child components for diversified news consumption:
  - **MainStory**: Highlights the most impactful positive news story of the moment.
  - **NewStories**: A dynamic feed of the latest uplifting news stories.
  - **TrendingStories**: Stories gaining popularity for their positive impact and inspirational content.
- **NewsByTopic**: A dedicated tab showcasing a grid of articles on user-selected topics. Currently, this section hosts one tab, with plans to expand as users customize their interests.
- **Account Tab**: A future addition aimed at personalizing the user experience further, allowing users to select and modify their news topic preferences.

![HomePage Top](/images/HP1.png)
![HomePage Bottom](/images/HP2.png)
![NewsByTopic Example](/images/Sports1.png)

### Backend Functionality

Our backend is built on Flask, leveraging the CORS library for handling cross-origin requests, and MongoDB for storing and managing news articles. The backend also incorporates OpenAI's GPT models for sentiment analysis and FAISS for efficient indexing and similarity search of high-dimensional vectors, allowing us to deliver the most relevant and uplifting news to our users.

#### Key Operations

- **Sentiment Analysis**: Currently, we focus on filtering news based on a sentiment score to ensure only positive news makes it to our platform. Each article's sentiment is evaluated, and only those with a positive score are stored and indexed.
- **Article Retrieval and Indexing**: Articles are fetched from various reputable sources, processed, and indexed using FAISS for efficient retrieval based on relevance to user interests and sentiment positivity.
- **Personalized News Feed**: In the next development phase, we plan to introduce personalization features, allowing users to select their interests and receive news tailored to their preferences.

#### API Endpoints

- `/getLatest`: Fetches the latest positive news stories, sorted by date.
- `/getMostRelevant`: Retrieves the most relevant positive news stories, sorted by sentiment score.
- `/getMostRelevant_byQuery`: Allows users to search for news based on specific topics or interests, returning the most relevant and positive stories.

## Future Directions

While Good News is currently focused on delivering general positive news content based on sentiment analysis, our roadmap includes introducing user personalization features. We aim to allow users to curate their news feed by selecting topics they are most interested in, thereby enhancing the relevance and impact of the positive news we deliver. Additionally, we plan to incorporate more advanced machine learning models to improve the accuracy of sentiment analysis and content personalization, making Good News an indispensable part of our users' daily news routine.

Good News is more than just an app; it's a movement towards a more balanced and positive news consumption experience. Join us in changing the way we consume news, one positive story at a time.