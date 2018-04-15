from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import operator
import pickle
import numpy.linalg as LA

def build_vectorizer(max_features, stop_words, max_df=1.0, min_df=1, norm='l2'):
    """Returns a TfidfVectorizer object
    
    Params: {max_features: Integer,
             max_df: Float,
             min_df: Float,
             norm: String,
             stop_words: String}
    Returns: TfidfVectorizer
    """
    # YOUR CODE HERE
    
    vectorizer = TfidfVectorizer(stop_words=stop_words, max_df=max_df, min_df=min_df, max_features=max_features,norm= norm)
    return vectorizer
    
query = raw_input("type in your query: ")
tech_desc = pickle.load(open( "c_des.p", "rb"))
n_feats = 100
#doc_by_vocab = np.empty([len(tech_desc.keys()), n_feats])
tfidf_vec = build_vectorizer(n_feats, "english")
#doc_by_vocab = tfidf_vec.fit_transform([v for v in tech_desc.values()]).toarray()
#index_to_vocab = {i:v for i, v in enumerate(tfidf_vec.get_feature_names())}

query_vocab = np.empty([len(query), n_feats])
query_vocab = tfidf_vec.fit_transform([query]).toarray()

def get_top10(query, data):
	cos_sim = {}
	for x in data:
		doc_by_vocab = np.empty([len(data[x]), 100])
		doc_by_vocab = tfidf_vec.fit_transform([data[x]]).toarray()
		sim = cosine_similarity(query, doc_by_vocab)
		cos_sim[x] = sim
	sorted_sim = sorted(cos_sim.iteritems(), key=lambda x:-x[1])[:10]
	print "Your top companies are:"
	for c in sorted_sim:
		print ""+c

def run():
	get_top10(query_vocab, tech_desc)

run()








