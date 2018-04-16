import csv
import glob
import pickle
import numpy as np
#Creat a pickle file for a dictionary with tickers as keys and 
#company name as value


category_dic = {'VCR':"Consumer Discretionary", 'VDC':"Consumer Staples", 
				'VDE': "Energy", 'VFH':"Financials", 'VHT':"Health Care",
				'VIS': "Industrials", 'VGT':"Information Technology",
				'VAW': "Materials", 'VNQ':"REIT", 'VOX':"Telecom Services",
				'VPU': "Utilities", 'VV':"Large-Cap", 'VO':"Mid-Cap", 
				'VB': "Small-Cap", 'VTV':"Value", 'VUG':"Growth", 
				'DSI':"Socially Conscious"}

company_des = pickle.load(open("c_des.p", "rb"))

cat_lst = list(category_dic.values())
reverse_index_cat = {idx:symbol for symbol, idx in enumerate(cat_lst)}
comp_lst = list(company_des.keys())
reverse_index_comp = {idx:symbol for symbol, idx in enumerate(comp_lst)}


def get_matrix():
	comp_categ_mat = np.zeros((len(company_des),len(category_dic)))
	for filename in glob.iglob('*.csv'):
		with open(filename) as csvDataFile:
		    csvReader = csv.reader(csvDataFile)
		    for row in csvReader:
			    try:
			    	if len(row) > 2 and row[1] != 'Symbol': 
			        	f_name = filename.split('.')
			        	key = f_name[0]
			        	category_ind = reverse_index_cat[category_dic[key]]
			        	comp_ind = reverse_index_comp[row[1]]
			        	comp_categ_mat[comp_ind][category_ind] = 1
			    except:
			    	pass


	new_compcat_mat = comp_categ_mat / (comp_categ_mat.sum(axis=1, keepdims=True) + 1)
	return new_compcat_mat

def run():
	company_category_mat = get_matrix()
	pickle.dump(company_category_mat, open("company_category_mat.p","wb"))


run()
