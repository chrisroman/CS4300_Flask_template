from jaccard import *
from cat_cosine import *


def get_ranking(categories, keywords, k=10):
	jaccard_results = jaccard(keywords, k=500)
	cosine_results = cosine_analysis(categories, k=500)
	company_points_dict = {}
	
	for cnt, jaccard_result in enumerate(jaccard_results):
		symbol = jaccard_result[1]
		points = 500 - cnt
		if symbol in company_points_dict:
			company_points_dict[symbol] += points
		else:
			company_points_dict[symbol] = points
			
	for cnt, cosine_result in enumerate(cosine_results):
		symbol = cosine_result
		points = 500 - cnt
		if symbol in company_points_dict:
			company_points_dict[symbol] += points
		else:
			company_points_dict[symbol] = points	
			
	return sorted(company_points_dict, k=A.get)[::-1][:10]
		
	