from flask import Flask, jsonify, request
from pymongo import MongoClient, errors
import requests
from apscheduler.schedulers.background import BackgroundScheduler
import os
import json

from langchain_community.document_loaders import TextLoader
from langchain_core.documents import Document
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores.chroma import Chroma
from langchain_community.embeddings.openai import OpenAIEmbeddings

embeddings = OpenAIEmbeddings()


vectorstore = Chroma(persist_directory="stuff", embedding_function=embeddings)

os.environ['OPENAI_API_KEY'] = "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"
app = Flask(__name__)

# MongoDB setup
mongo_connection_string = 'mongodb://localhost:27017/'
client = MongoClient(mongo_connection_string)
# create a new database and collection
db = client['news_database']
collection = db['top_headlines']
def fetch_and_update_news():
    api_url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=40e2e0d7084f40239d54fa6e26fd1cf8"
    try:
        response = requests.get(api_url)
        data = response.json()
        if data['status'] == 'ok' and 'articles' in data:
            for article in data['articles']:
                try:
                    # Upsert articles based on 'url' to avoid duplicates
                    collection.update_one({'url': article['url']}, {'$setOnInsert': article}, upsert=True)
                    print(article)
                    document = Document(page_content=str(json.dumps(article)), metadata={"source": article['url']})

                    vectorstore.add_documents([document])
                except errors.DuplicateKeyError:
                    print(f"Duplicate article skipped: {article['url']}")
            print("News data updated.")
            # Embed the documents
            # Update the vector store
        else:
            print("Failed to fetch data from the API or no articles found.")
        
    except Exception as e:
        print(f"An error occurred while fetching news: {e}")

def mongo_doc_to_dict(doc):
    """Convert a MongoDB document to a dictionary that is JSON serializable."""
    doc["_id"] = str(doc["_id"])  # Convert ObjectId to string
    return doc

@app.route('/getLatest', methods=['GET'])
def get_latest():
    articles = collection.find().sort("publishedAt", -1).limit(1 0)
    articles_list = [mongo_doc_to_dict(articl e) for article in articles]
    return jsonify(articles_list)

@app.route('/getMostRelevant', methods=['GET'])
def get_most_relevant():
    articles = collection.find().sort("publishedAt", -1).limit(1)
    articles_list = [mongo_doc_to_dict(article) for article in articles]
    return jsonify(articles_list)

@app.route('/getMostRelevant_byQuery', methods=['POST'])
def get_most_relevant_by_query():
    query = request.json['query']
    results = vectorstore.similarity_search(query, k=10)
    page_content = [json.loads(result.page_content) for result in results]
    return jsonify(page_content)


if __name__ == '__main__':
    # Initialize scheduler with your chosen configuration
    scheduler = BackgroundScheduler()
    scheduler.add_job(func=fetch_and_update_news, trigger="interval", minutes=1)
    scheduler.start()

    # Shut down the scheduler when exiting the app
    try:
        app.run(debug=True)
    except (KeyboardInterrupt, SystemExit):
        scheduler.shutdown()