import get_sentiment as GS
import pickle 
import time


companies = pickle.load( open( "t_comp.p", "rb" ) )
comp_twidata = pickle.load( open( "company_twidata.p", "rb" ) )

def get_data(companies):
	count = 0
	for k,v in companies.iteritems():
		if count==800:
			break
		
		while True:
			try:
				if v not in comp_twidata:
					print(v)
					api = GS.TwitterClient()
					tup = api.get_company_sentiment_descriptor(v)
					print(tup)
					comp_twidata[v] = tup
					count+=1
			except Exception as e:
				print("Error is: " + str(e))
				print("I'm about to sleep")
				time.sleep(920)
				continue
			break


def run():
	get_data(companies)
	pickle.dump( comp_twidata,open("company_twidata.p", "wb" ))


run()