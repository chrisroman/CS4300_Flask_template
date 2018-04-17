import csv
import glob
import pickle
import numpy as np
import os

#Create a pickle file for a dictionary with tickers as keys and 
#company name as value

# Helper function to get the correct path
def make_path(filename):
  dir_path = os.path.dirname(os.path.realpath(__file__))
  return os.path.join(dir_path, filename)

category_dic = {'VCR':"Consumer Discretionary", 'VDC':"Consumer Staples", 
        'VDE': "Energy", 'VFH':"Financials", 'VHT':"Health Care",
        'VIS': "Industrials", 'VGT':"Information Technology",
        'VAW': "Materials", 'VNQ':"REIT", 'VOX':"Telecom Services",
        'VPU': "Utilities", 'VV':"Large-Cap", 'VO':"Mid-Cap", 
        'VB': "Small-Cap", 'VTV':"Value", 'VUG':"Growth", 
        'DSI':"Socially Conscious"}

company_des = pickle.load(open(make_path("c_des.p"), "rb" ))
cat_lst = list(category_dic.values())
reverse_index_cat = {symbol:idx for idx, symbol in enumerate(cat_lst)}
comp_lst = list(company_des.keys())
reverse_index_comp = {symbol:idx for idx, symbol in enumerate(comp_lst)}


company_cat_mat = pickle.load(open(make_path("company_category_mat.p"),"rb"))

def cosine_sim(query, mat):
  query_mat = np.zeros((len(company_des),len(category_dic)))
  for cat in query:
    cat_ind = reverse_index_cat[str(cat)]
    query_mat[:,cat_ind] = 1
  nor_query_mat = query_mat / (query_mat.sum(axis=1, keepdims=True) + 1)

  cos_sim = nor_query_mat * mat

  return cos_sim

def get_topK(mat, k):
  sum_arr = np.sum(mat,axis=1)
  max_ind = np.argpartition(sum_arr, -k)[-k:]
  top_comp = []
  for i in max_ind:
    top_comp.append(comp_lst[i])
  return top_comp

def cosine_analysis(query, k=10):
  matrix = company_cat_mat
  cos = cosine_sim(query, matrix)
  return get_topK(cos, k)

  # Debugging
  # print(top_10)
  # print(reverse_index_comp['EMN'])
  # print(cos[987])   

# query = ["Mid-Cap"]
# cosine_analysis(query)
