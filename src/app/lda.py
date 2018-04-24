import os
import nltk
dir_path = os.path.dirname(os.path.realpath(__file__))
nltk.data.path.append(os.path.join(dir_path, './nltk_data'))

from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.corpus import stopwords
from nltk.stem.wordnet import WordNetLemmatizer
import string
from gensim import corpora, models
import numpy as np
import operator
import pickle


tech_desc = pickle.load(open( "c_des.p", "rb"))
company_array = []
for ticker, desc in tech_desc.items():
	company_array.append(desc)


stop = set(stopwords.words('english'))
exclude = set(string.punctuation)
exclude.add(':')
common_company_terms = set(['ca.','company,','consumer', 'ca.', 'well', 'services,','products,', 'products.','includes', 'include', 'solution', 'company', 'service', 'services.', 'product', 'products', 'customer', 'customers', 'segments:','segment', 'segments', 'business', 'founded', 'headquartered', 'inc.', 'services', 'operates', 'provides', 'engages']) 
lemma = WordNetLemmatizer()

def clean(doc):
	stop_free = " ".join([i for i in doc.lower().split() if i not in stop])
	punc_free = " ".join([ch for ch in stop_free.lower().split() if ch not in exclude])
	comm_free = " ".join([ch for ch in punc_free.lower().split() if ch not in common_company_terms])
	normalized = " ".join(lemma.lemmatize(word) for word in comm_free.split())
	return normalized


def clean_docs(c_array):
	clean_array = [clean(desc).split() for desc in c_array]
	return clean_array

company_array_clean = clean_docs(company_array) # The cleaned up array
#print(company_array_clean[1])

 # Here we create a term-document matrix. Gensim.corpora uses a bag-of-words model to count frequencies of
 # word occurences.

dictionary = corpora.Dictionary(company_array_clean)
doc_term_matrix = [dictionary.doc2bow(company) for company in company_array_clean]

Lda = models.ldamodel.LdaModel
ldamodel = Lda(doc_term_matrix, num_topics=3, id2word = dictionary, passes=10)
print(ldamodel.print_topics(num_topics=3, num_words=15))






