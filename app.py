import openai
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import json
from eventregistry import *
import news_classifier
from apscheduler.schedulers.background import BackgroundScheduler

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

    scheduler = BackgroundScheduler()
    scheduler.add_job(func=news_classifier.get_articles, args=[True], trigger="interval", minutes=1)
    scheduler.start()

    # Shut down the scheduler when exiting the app
    try:
        app.run(debug=True, port=8001)
    except (KeyboardInterrupt, SystemExit):
        scheduler.shutdown()
    # app.run()


