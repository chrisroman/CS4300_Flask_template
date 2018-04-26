from jaccard import *
from cat_cosine import *
from clusteredcompanies import *


def get_ranking(categories, keywords, k=10):
	company_points_dict = {}

	# jaccard
	if keywords != "":
		jaccard_results = jaccard(keywords, k=500)
		jaccard_results = sorted(jaccard_results.items(), key=lambda x: -1 * x[1][0])
	for cnt, jaccard_result in enumerate(jaccard_results):
		symbol = jaccard_result[1][1]
		points = 500 - cnt
		if symbol in company_points_dict:
			company_points_dict[symbol] += points
		else:
			company_points_dict[symbol] = points

	# lsa
	if keywords != "":
		lsa_results = get_sim_companies(keywords)
		for cnt, lsa_result in enumerate(lsa_results):
			symbol = lsa_result
			points = (500 - cnt)
			if symbol in company_points_dict:
				company_points_dict[symbol] += points
			else:
				company_points_dict[symbol] = points

	# cosine categories
	if categories != {}:
		cosine_results = cosine_analysis(categories, k=500)
		for cnt, cosine_result in enumerate(cosine_results):
			symbol = cosine_result
			points = (500 - cnt) * 0.2
			if symbol in company_points_dict:
				company_points_dict[symbol] += points
			else:
				company_points_dict[symbol] = points
			
	return sorted(company_points_dict, key=company_points_dict.get)[::-1][:10]
		
	
