import csv
import glob


def get_tickers():
	tickers = []
	for filename in glob.iglob('*.csv'):
		with open(filename) as csvDataFile:
		    csvReader = csv.reader(csvDataFile)
		    for row in csvReader:
		    	if len(row) > 2 and row[1] != 'Symbol': 
		        	tickers.append(row[1])

	return tickers

def write_to_file(data):
	filename = 'output.txt'
	with open(filename, 'wb') as x_file:
		for tkrs in data: 
        		x_file.write(("%s\n" % tkrs))


def run():
	data = get_tickers()
	from collections import Counter
	print(Counter(data))
	#write_to_file(data)

run()