import csv
import glob
import pickle

#Creat a pickle file for a dictionary with tickers as keys and 
#company name as value
def get_tickers():
	comp_des = {}
	for filename in glob.iglob('*.csv'):
		with open(filename) as csvDataFile:
		    csvReader = csv.reader(csvDataFile)
		    for row in csvReader:
		    	comp_des[row[0]]=row[1]
		    		
	return comp_des
	
def run():
	data = get_tickers()
	#pickle.dump(data, open("c_des.p","wb"))
	dic = pickle.load(open("c_des.p","rb")) 
	print(dic['AAPL'])

run()