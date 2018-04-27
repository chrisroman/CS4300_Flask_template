from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.tokenize import TreebankWordTokenizer
from expand_query import expand_query 
import numpy as np
import pickle 
import os
import sys

dir_path = os.path.dirname(os.path.realpath(__file__))
company_desc = pickle.load(open(os.path.join(dir_path, "c_des.p"), "rb" ))
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
def jaccard(query, k=10): 
    expand = expand_query(query.replace(',', ''))
    query = set(expand)
    matches = []
    for ticker in company_desc:
        des = TreebankWordTokenizer().tokenize(company_desc[ticker].lower())
        inte = set(des).intersection(query)
        uni = set(des).union(query)
        jac = float(len(inte)) / len(uni)
        if inte:
            matches.append((jac,ticker))


    sort_lst = sorted(matches, key=lambda x: -1 * x[0])

    results = {}
    for i in range(k):
        try:
            jac_score, symbol = matches[i]
            results[symbol] = (jac_score, symbol, ticker_to_name[symbol], company_desc[symbol])
        except:
            return results

    return results


def get_matching_terms(query, symbol):
  query = set(expand_query(query.replace(',', '')))
  des = TreebankWordTokenizer().tokenize(company_desc[symbol].lower())
  inte = set(des).intersection(query)
  if len(inte) == 0:
    return '';
  else:
    result_string = 'This company was chosen because its description contained the following terms related to your query: '
    if len(inte) == 1:
      result_string += ', '.join(inte) + '.'
    else:
      result_string += ', '.join(inte)[:-2] + '.'
    return result_string


# Get rid of this if you dont want it, just here as an example 
#jaccard("vacation")

