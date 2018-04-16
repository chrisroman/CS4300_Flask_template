from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.tokenize import TreebankWordTokenizer
from expand_query import expand_query 
import numpy as np
import pickle 
import os
import sys

dir_path = os.path.dirname(os.path.realpath(__file__))
company_desc = pickle.load(open(os.path.join(dir_path, "company_desc.p"), "rb" ))
ticker_to_name = pickle.load(open(os.path.join(dir_path, "t_comp.p"), "rb" ))

def build_vectorizer(max_features, stop_words, max_df=0.8, min_df=1, norm='l2'):
    """Returns a TfidfVectorizer object
    
    Params: {max_features: Integer,
             max_df: Float,
             min_df: Float,
             norm: String,
             stop_words: String}
    Returns: TfidfVectorizer
    """
    # YOUR CODE HERE
    return TfidfVectorizer(min_df=min_df, max_df=max_df, max_features=max_features, stop_words=stop_words, norm=norm)

''' 
    Returns the jaccard similarity and company information of the top 10
    companies searched.
    @returns: Dict<Tuple> in the following format:
    {
      "SYMBOL1": (jaccard_score, company_name, company_description),
      "SYMBOL2": (jaccard_score, company_name, company_description),
      "SYMBOL3": (jaccard_score, company_name, company_description),
      ...
    }
'''
def jaccard(query): 
    n_feats = 100
    doc_by_vocab = np.empty([len(company_desc.keys()), n_feats])
    tfidf_vec = build_vectorizer(n_feats, "english")
    doc_by_vocab = tfidf_vec.fit_transform([v for v in company_desc.values()]).toarray()
    index_to_vocab = {i:v for i, v in enumerate(tfidf_vec.get_feature_names())}

    expand = expand_query(query)
    query = set(expand)
    matches = [] 
    for k in company_desc:
        des = TreebankWordTokenizer().tokenize(company_desc[k].lower())
        inte = set(des).intersection(query)
        uni = set(des).union(query)
        jac = float(len(inte)) / len(uni)
        if inte:
            matches.append((jac,k))

    sort_lst = sorted(matches, key=lambda x: x[0])

    results = {}
    for i in range(0,10):
        try:
            jac_score, symbol = matches[i]
            results[symbol] = (jac_score, ticker_to_name[symbol], company_desc[symbol])
        except:
            return results

    return results

# Get rid of this if you dont want it, just here as an example 
#jaccard("vacation")

