import os
import nltk
dir_path = os.path.dirname(os.path.realpath(__file__))
nltk.data.path.append(os.path.join(dir_path, './nltk_data'))

from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from nltk.corpus import stopwords
from nltk.stem.wordnet import WordNetLemmatizer
import numpy as np
import string
import operator
import pickle

# Helper function to get the correct path
def make_path(filename):
  dir_path = os.path.dirname(os.path.realpath(__file__))
  return os.path.join(dir_path, filename)

tech_desc = pickle.load(open(make_path("c_des.p"), "rb" ))
pair_array = []
for ticker, desc in tech_desc.items():
	pair_array.append((ticker,desc))
pair_array = sorted(pair_array, key=lambda x: x[0])
company_array = [pair[1] for pair in pair_array]

stop = set(stopwords.words('english'))
exclude = set(string.punctuation)
exclude.add(':')
common_company_terms = set(['ca.','company,','consumer', 'ca.', 'well', 'services,','products,', 'products.','includes', 'include', 'solution', 'company', 'service', 'services.', 'product', 'products', 'customer', 'customers', 'segments:','segment', 'segments', 'business', 'founded', 'headquartered', 'inc.', 'services', 'operates', 'provides', 'engages']) 
lemma = WordNetLemmatizer()

def strip_punc(doc):
	doc_array = doc.split(' ')
	clean_array = []
	for d in doc_array:
		clean_array.append(d.rstrip('?!:,.;'))
	return " ".join(clean_array)


def clean(doc):
	stop_free = " ".join([i for i in doc.lower().split() if i not in stop])
	punc_free = " ".join([ch for ch in stop_free.lower().split() if ch not in exclude])
	comm_free = " ".join([ch for ch in punc_free.lower().split() if ch not in common_company_terms])
	normalized = " ".join(lemma.lemmatize(word) for word in comm_free.split())
	normalized = strip_punc(normalized)
	return normalized


def clean_docs(c_array):
	clean_array = [clean(desc) for desc in c_array]
	return clean_array

company_array_clean = clean_docs(company_array) # The cleaned up array

vectorizer = TfidfVectorizer(stop_words='english',max_features=1000)
tfidf_matrix = vectorizer.fit_transform(company_array_clean).todense()

# We can play around with the number of clusters
kmeans = KMeans(n_clusters=10, random_state=0).fit(tfidf_matrix)

def get_labels():
	return kmeans.labels_

