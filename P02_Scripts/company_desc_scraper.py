from urlparse import urlparse
import requests
from threading import Thread, Lock
import httplib, sys
from Queue import Queue
from bs4 import BeautifulSoup
import csv

ticker_file = open('tickers.txt', 'r')
tickers = [''.join(ticker.strip().split(".")) for ticker in ticker_file.readlines()]
ticker_file.close()
#print(tickers)

finished_file = open('out.txt', 'r')
finished = {ticker.strip(): True for ticker in finished_file.readlines()}
finished_file.close()

f = open('company_descriptions.csv', 'a')
csv_writer = csv.writer(f)
num_done = [0]

concurrent = 8
mutex = Lock()

def doWork():
  while True:
    print("Getting...")
    url = q.get()
    print("Extracting from: " + url)
    resp = requests.get(url)
    extract_resp(resp)
    q.task_done()

def extract_resp(resp):
  try:
    soup = BeautifulSoup(resp.content, 'lxml')
    comp_desc = soup.find('div', {'id': 'wsod_companyDescription'}).text
    symbol = soup.find('span', {'class': 'wsod_smallSubHeading'}).text
    if ':' in symbol:
      symbol = symbol[symbol.index(':')+1:]
      if symbol[-1] == ')':
        symbol = symbol[:-1]
    mutex.acquire()
    num_done[0] += 1
    print("FINISHED: " + str(num_done))
    if not all(ord(c) < 128 for c in symbol) or not all(ord(c) < 128 for c in comp_desc):
      mutex.release()
    else:
      csv_writer.writerow([symbol, comp_desc])
      mutex.release()
  except Exception as e:
    print(e)
    mutex.acquire()
    num_done[0] += 1
    print("FINISHED: " + str(num_done))
    mutex.release()
    return

q = Queue(concurrent * 2)
for i in range(concurrent):
  t = Thread(target=doWork)
  t.daemon = True
  t.start()

try:
  urls = ["http://money.cnn.com/quote/profile/profile.html?symb=" + ticker \
      for ticker in tickers if ticker not in finished]
  for url in urls:
    q.put((u''.join(url)).encode('utf-8').strip())
  q.join()
except KeyboardInterrupt:
  sys.exit(1)

