import csv
import glob
import pickle

#Creat a pickle file for a dictionary with tickers as keys and 
#company name as value
def get_tickers():
	tic_comp = {}
	for filename in glob.iglob('*.csv'):
		with open(filename) as csvDataFile:
		    csvReader = csv.reader(csvDataFile)
		    for row in csvReader:
		    	if len(row) > 2 and row[1] != 'Symbol': 
		        	tic_comp[row[1]]=row[0]
	return tic_comp
	
def run():
	data = get_tickers()
	pickle.dump(data, open("t_comp.p","wb"))


run()