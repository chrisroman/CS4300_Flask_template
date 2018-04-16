import os
import nltk as nltk

# Set directory for nltk to look for corpora
dir_path = os.path.dirname(os.path.realpath(__file__))
nltk.data.path.append(os.path.join(dir_path, './nltk_data'))
from nltk.corpus import wordnet

'''
gets the synonyms associated with the input word and returns it as a list
'''
def synonyms(word):
    synonyms = [] 
    for syn in wordnet.synsets(word):
        for l in syn.lemmas():
            synonyms.append(l.name())
    return synonyms

'''
Expands the given query using thesarus generation and appends the 
synonyms to the end of the original query
''' 

def expand_query(query):
    original_q = query
    # dictionary = PyDictionary() 
    query = original_q.split() 
    synon = []
    for w in query:
        synon += synonyms(w)
    n_query = [original_q]

    if synon:

        for words in synon: 
            n_query.append(words.lower().replace("_"," "))

        return n_query

    else: 
        return [original_q]
