import openai
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import json
from eventregistry import *
load_dotenv()
# Load the API key from the secrets manager
# openai.api_key = secrets["api_key"]
# Create a Flask app

openai.api_key = os.getenv("OPENAI_API_KEY")
newsApiKey = os.getenv("NEWS_API_KEY")

def get_articles():
    articles_list = []
    er = EventRegistry('4ef87222-e160-45d9-93b7-c73afe5891e3')
    q = QueryArticlesIter(
        keywordsLoc = "title",
        lang = 'eng')
    for article in q.execQuery(er, sortBy = "rel",
            returnInfo = ReturnInfo(articleInfo = ArticleInfoFlags(concepts = True, categories = True)),
            maxItems = 100):
        # Convert the article to a dictionary
        article_dict = {
            "uri": article["uri"],
            "title": article["title"],
            "body": article["body"],
            "url": article["url"],
            "image": article["image"],
            "date": article["date"],
            "time": article["time"],
            "categories": article["categories"],
            "sentiment": article["sentiment"],
            "source": article["source"]["uri"],
        }
        articles_list.append(article_dict)
    with open('articles.json', 'w') as json_file:
        json.dump(articles_list, json_file, indent=4)

# Define a function to perform sentiment analysis using OpenAI's GPT-3 API
def analyze_sentiment(article):
    prompt = f"""Please analyze the sentiment of the following news 
    article title and respond only in one word, 
    either <positive> or <negative>, based on the following 
    criteria:

    Positive could mean:
    1. Happy
    2. Non-polarizing
    3. Success stories
    4. Uplifting
    5. Inspiring

    Negative could mean:
    1. Sad
    2. Controversial
    3. Unfortunate events
    4. Disturbing
    5. Pessimistic

    Article Title: {article}
    """
    response = openai.Completion.create(
        engine="gpt-3.5-turbo-instruct",
        prompt=prompt,
        temperature=0.1,
        max_tokens=50,
        n=1,
        stop=None,
        timeout=15,
    )
    sentiment = response.choices[0].text.strip()
    return sentiment

# Wrapper function for getting the good news list
def get_good_news(articles):
    good_news = []
    for article in articles:
        sentiment = analyze_sentiment(article["title"])
        if "positive" in sentiment.lower():
            entry = {
                "title": article["title"],
                "body": article.get("body", ""),
                "link": article.get("link", ""),
                "img": article.get("image", ""),
                "date": article.get("date", ""),
            }
            good_news.append(entry)
    return good_news




# @app.route("/newsletter", methods=["POST"])
# def goodnewsletter():
#     with open("./mock_news.json", "r") as f:
#         data = json.load(f)
#         # data = data["news"]
#     return data
    # person = request.form.get("person")
    # good_newsletter = generate_newsletter(person, data)
    # response = jsonify(newsletter=good_newsletter) # wrap the response in a JSON object with a key "newsletter"
    # # response.headers.add('Access-Control-Allow-Origin', '*')
    # print('response: ', response)
    # return response

#wrapper function for getting the news articler
# def generate_newsletter(person, articles):
#     # Get the good news articles for the person
#     good_news = get_good_news(person, articles)

#     # Concatenate the article titles and summaries into a single string
#     article_text = "\n\n".join(good_news)

#     # Generate the newsletter using OpenAI's GPT-3 API
#     prompt = f"""Please generate a newsletter with the following good news articles:\n\n{article_text}"""
#     response = openai.Completion.create(
#         engine="text-babbage-001",
#         prompt=prompt,
#         temperature=0.5,
#         max_tokens=1024,
#         n=1,
#         stop=None,
#         timeout=60,
#     )
#     newsletter = response.choices[0].text.strip()
#     return newsletter
