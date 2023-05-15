import openai
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import json
load_dotenv()
# Load the API key from the secrets manager
# openai.api_key = secrets["api_key"]
openai.api_key = os.getenv("OPENAI_API_KEY")

# Define a function to perform sentiment analysis using OpenAI's GPT-3 API
def analyze_sentiment(article, person):
    prompt = f"""Please analyze the sentiment of the following news 
    article from the perspective of the person described in dual backticks (might not be relevant to the article) ``{person}`` and respond only in one word, 
    either <positive> or <negative>: {article}"""
    response = openai.Completion.create(
        engine="text-ada-001",
        prompt=prompt,
        temperature=0.1,
        max_tokens=50,
        n=1,
        stop=None,
        timeout=15,
    )
    sentiment = response.choices[0].text.strip()
    return sentiment

#wrapper function for getting the good news list
def get_good_news(person, articles):
    good_news = []
    for article in articles:
        sentiment = analyze_sentiment(article["article"], person)
        if "positive" in sentiment.lower():
            entry = {
                "company": article["company"],
                "title": article["title"],
                "article": article["article"],
                "link": article["link"]
            }
            good_news.append(entry)
    return good_news

#wrapper function for getting the news articler
def generate_newsletter(person, articles):
    # Get the good news articles for the person
    good_news = get_good_news(person, articles)

    # Concatenate the article titles and summaries into a single string
    article_text = "\n\n".join(good_news)

    # Generate the newsletter using OpenAI's GPT-3 API
    prompt = f"""Please generate a newsletter with the following good news articles:\n\n{article_text}"""
    response = openai.Completion.create(
        engine="text-ada-001",
        prompt=prompt,
        temperature=0.5,
        max_tokens=1024,
        n=1,
        stop=None,
        timeout=60,
    )
    newsletter = response.choices[0].text.strip()
    return newsletter



# Create a Flask app
app = Flask(__name__)
CORS(app)

# Define a route to get good news for a given person
@app.route("/goodnews", methods=["POST"])
def goodnews():
    with open("./mock_news.json", "r") as f:
        data = json.load(f)
        data = data["news"]
    person = request.form.get("person")
    good_news = get_good_news(person, data)
    return jsonify(good_news)

@app.route("/newsletter", methods=["POST"])
def goodnewsletter():
    with open("./mock_news.json", "r") as f:
        data = json.load(f)
        data = data["news"]
    person = request.form.get("person")
    good_newsletter = generate_newsletter(person, data)
    print('data: ', data)
    response = jsonify(newsletter=good_newsletter) # wrap the response in a JSON object with a key "newsletter"
    # response.headers.add('Access-Control-Allow-Origin', '*')
    print('response: ', response)
    return response


# Start the app
if __name__ == "__main__":
    # # Load the JSON data
    app.run()

