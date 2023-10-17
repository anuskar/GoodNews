import openai
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import json
from eventregistry import *
import news_classifier
load_dotenv()
# Load the API key from the secrets manager
# openai.api_key = secrets["api_key"]
# Create a Flask app
app = Flask(__name__)
CORS(app)

# Define a route to get good news for a given person
@app.route("/goodnews", methods=["POST"])
def goodnews():
    with open("./articles.json", "r") as f:
        data = json.load(f)
        # data = data["news"]
    good_news = news_classifier.get_good_news(data)
    return jsonify(good_news)

# Start the app
if __name__ == "__main__":
    # # Load the JSON data
    news_classifier.get_articles()
    app.run()


