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

comp_categ_mat = np.zeros((len(company_des),len(category_dic)))

cat_lst = list(category_dic.values())
# category_index = {"Consumer Discretionary":0, "Consumer Staples":1, 
# 				  "Energy":2, "Financials":3, "Health Care":4,
# 				  "Industrials":5, "Information Technology":6,
# 				  "Materials":7, "REIT":8, "Telecom Services":9,
# 				  "Utilities":10, "Large-Cap":11, "Mid-Cap":12, 
# 				  "Small-Cap":13, "Value":14, "Growth":15, 
# 				  "Socially Conscious":16}


# lst = ["VCR", "VDE", "VIS", ...]
reverse_index_cat = {symbol:idx for symbol, idx in enumerate(cat_lst)}
comp_lst = list(company_des.keys())
reverse_index_comp = {symbol:idx for symbol, idx in enumerate(comp_lst)}

print(reverse_index_cat)


# def get_tickers():
# 	tickers = []
# 	for filename in glob.iglob('*.csv'):
# 		with open(filename) as csvDataFile:
# 		    csvReader = csv.reader(csvDataFile)
# 		    for row in csvReader:
# 		    	if len(row) > 2 and row[1] != 'Symbol': 
# 		        	tickers.append(row[1])

# 	return tickers
	
# def run():
# 	data = get_tickers()
# 	pickle.dump(data, open("t_comp.p","wb"))


# run()