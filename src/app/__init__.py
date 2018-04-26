import os
from flask import Flask, render_template, jsonify, make_response, request
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
import config
import json
import pickle

from get_sentiment import *
from jaccard import *
from cat_cosine import *
from ranking import *
from clusteredcompanies import *

# Configure Flask app
app = Flask(__name__, static_url_path='/static')
#cors = CORS(app)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
#app.config['CORS_HEADERS'] = 'Content-Type'

# Database
db = SQLAlchemy(app)

# create (Twitter) sentiment analyzer
twitter_analyzer = TwitterClient()

# Load map of ticker to company names
# Helper function to get the correct path
def make_path(filename):
  dir_path = os.path.dirname(os.path.realpath(__file__))
  return os.path.join(dir_path, filename)

t_comp = pickle.load(open(make_path("t_comp.p"), "rb" ))
company_twidata = pickle.load(open(make_path("company_twidata.p"), "rb"))

# Import + Register Blueprints
# from app.TODO import TODO as TODO # pylint: disable=C0413
# app.register_blueprint(TODO)

# React Catch All Paths
@app.route('/', methods=['GET'])
def index():
  return render_template('index.html')

@app.route('/query', methods=['POST'])
#@cross_origin()
def query():
  data = json.loads(request.data)

  categories = data["categories"].keys()
  company_sentiments = {}
  ranked_results = get_ranking(categories, data["user_keywords"])

  # Do sentiment analysis on all of the returned companies
  NUM_COMPANIES = 3 # Set to a low amount for testing
  for ticker in ranked_results:
    company_name = ticker_to_name[ticker]
    sentiment_data = company_twidata[company_name]
    company_sentiments[ticker] = sentiment_data + (company_name,)

  # Create response to be sent back to client-side
  response = {
      #"jaccard_results": jaccard_results,
      "company_sentiments": company_sentiments,
      #"cosine_results": cosine_results,
      "final_ranking": ranked_results
  }

  return jsonify(response)


# HTTP error handling
@app.errorhandler(404)
def not_found(error):
  return render_template('404.html'), 404
