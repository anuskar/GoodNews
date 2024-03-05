import openai
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import json
from eventregistry import *

from pymongo import MongoClient, errors
import requests
from apscheduler.schedulers.background import BackgroundScheduler

from langchain_community.document_loaders import TextLoader
from langchain_core.documents import Document
from langchain_openai import OpenAIEmbeddings
# from langchain_community.vectorstores.chroma import Chroma
from langchain_community.embeddings.openai import OpenAIEmbeddings

from langchain_text_splitters import CharacterTextSplitter
from langchain_community.vectorstores.faiss import FAISS




load_dotenv()
app = Flask(__name__)
CORS(app)
embeddings = OpenAIEmbeddings()
vectorstore = FAISS.load_local("test", embeddings)
# vectorstore = FAISS(persist_directory="stuff", embedding_function=embeddings)

openai.api_key = os.getenv("OPENAI_API_KEY")
newsApiKey = os.getenv("NEWS_API_KEY")

mongo_connection_string = os.getenv("MONGO_CONNECTION")
client = MongoClient(mongo_connection_string)
# create a new database and collection
db = client['news_database']
collection = db['top_headlines']



def get_articles(reset):
    er = EventRegistry(newsApiKey)
    q = QueryArticlesIter(
        keywordsLoc = "title",
        lang = 'eng',
        sourceUri = QueryItems.OR([er.getSourceUri("bbc"), er.getSourceUri("cnn"), er.getSourceUri("new york times"), er.getSourceUri("cnn"), er.getSourceUri("nbc"), er.getSourceUri("abc"), er.getSourceUri("forbes"), er.getSourceUri("usa today"), er.getSourceUri("yahoo"), er.getSourceUri("cnbc"), er.getSourceUri("the washington post")]))
    if reset:
        vectorstore = None
    for article in q.execQuery(er, sortBy = "rel",
            returnInfo = ReturnInfo(articleInfo = ArticleInfoFlags(concepts = True, categories = True, basicInfo=True)),
            maxItems = 200):
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
        if article_dict["sentiment"] > 0.1:
            try:
        # Upsert articles based on 'url' to avoid duplicates
                collection.update_one({'uri': article_dict['uri']}, {'$setOnInsert': article_dict}, upsert=True)
                documentsss = Document(page_content=str(json.dumps(article_dict)), metadata={"source": article_dict['uri']})
                if vectorstore == None:
                    vectorstore = FAISS.from_documents([documentsss], embeddings)
                else: 
                    vectorstore.add_documents([documentsss])
                vectorstore.save_local("test")

            except errors.DuplicateKeyError:
                print(f"Duplicate article skipped: {article['url']}")
        # articles_list.append(article_dict)
    # with open('articles.json', 'w') as json_file:
    #     json.dump(articles_list, json_file, indent=4)
    
def mongo_doc_to_dict(doc):
    """Convert a MongoDB document to a dictionary that is JSON serializable."""
    doc["_id"] = str(doc["_id"])  # Convert ObjectId to string
    return doc

@app.route('/getLatest', methods=['GET'])
def get_latest():
    articles = collection.find().sort("date", -1).limit(3)
    articles_list = [mongo_doc_to_dict(article) for article in articles]
    return jsonify(articles_list)

@app.route('/getMostRelevant', methods=['GET'])
def get_most_relevant():
    articles = collection.find().sort("sentiment", -1).limit(5)
    articles_list = [mongo_doc_to_dict(article) for article in articles]
    return jsonify(articles_list)

@app.route('/getMostRelevant_byQuery', methods=['POST'])
def get_most_relevant_by_query():
    query = request.json['topic']
    results = vectorstore.similarity_search(query, k=50)
    page_content = [json.loads(result.page_content) for result in results]
    return jsonify(page_content)


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
        # sentiment = analyze_sentiment(article["title"])
        # if "positive" in sentiment.lower():
        entry = {
            "title": article["title"],
            "body": article.get("body", ""),
            "link": article.get("link", ""),
            "img": article.get("image", ""),
            "date": article.get("date", ""),
        }
        good_news.append(entry)
    return good_news

if __name__ == "__main__":
    # # Load the JSON data
    app.run()