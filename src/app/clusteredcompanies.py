from cluster import *
from jaccard import *
from statistics import mode
import pickle


# In this file we find companies similar to the top 10 (based on Jaccard) by clustering
tech_desc = pickle.load(open("c_des.p", "rb"))
company_array = []
for ticker, desc in tech_desc.items():
	company_array.append((ticker,desc))

company_array = sorted(company_array, key=lambda x: x[0]) # We need an ordering of the companies. Alphabetically
inv_index = {}
for i in range(len(company_array)):
	inv_index[company_array[i][0]] = i

def get_sim_companies(query):
	company_labels = get_labels()
	top10_tickers = jaccard(query).keys()
	top10_indices = [inv_index[tick] for tick in top10_tickers]
	top10_clusters = [company_labels[ind] for ind in top10_indices]
	most_freq_label = mode(top10_clusters) 
	
	# Swap all companies NOT pertaining to the most_freq_label with companies with that label
	return_indices = [ind for ind in top10_indices if company_labels[ind] == most_freq_label]
	return_ind_set = set(return_indices)
	for j in range(10-len(return_indices)):
		for k in range(len(company_array)):
			if (company_labels[k] == most_freq_label) and (k not in return_ind_set):
				return_indices.append(k)
				return_ind_set.add(k)
				break
	
	sim_companies = {}
	for ind in return_indices:
		sim_companies[company_array[ind][0]] = company_array[ind][1]
	return sim_companies
