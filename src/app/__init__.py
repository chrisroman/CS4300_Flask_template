import os
from flask import Flask, render_template, jsonify, make_response, request
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
import config

from get_sentiment import *
from jaccard import *

# Configure Flask app
app = Flask(__name__, static_url_path='/static')
cors = CORS(app)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['CORS_HEADERS'] = 'Content-Type'

# Database
db = SQLAlchemy(app)

# Import + Register Blueprints
# from app.TODO import TODO as TODO # pylint: disable=C0413
# app.register_blueprint(TODO)

# React Catch All Paths
@app.route('/', methods=['GET'])
def index():
  return render_template('index.html')

@app.route('/<path:path>', methods=['GET'])
def any_root_path(path):
  return render_template('index.html')

@app.route('/query', methods=['POST'])
@cross_origin()
def query():
  data = request.data
  print(data)
  response = jsonify(data)
  return response


# HTTP error handling
@app.errorhandler(404)
def not_found(error):
  return render_template('404.html'), 404
