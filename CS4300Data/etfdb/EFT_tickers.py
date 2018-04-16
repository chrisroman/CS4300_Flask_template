import csv
import glob


def get_tickers():
	tickers = set()
	for filename in glob.iglob('*.csv'):
		with open(filename) as csvDataFile:
		    csvReader = csv.reader(csvDataFile)
		    for row in csvReader:
		    	if len(row) > 2 and row[1] != 'Symbol': 
		        	tickers.add(row[1])

	return tickers

def write_to_file(data):
	filename = 'tickers.txt'
	with open(filename, 'wb') as x_file:
		for tkrs in data: 
        		x_file.write(("%s\n" % tkrs))


def run():
	data = list(get_tickers())
	write_to_file(data)

run()