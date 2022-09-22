from configs import CONFIGS
import requests;
import math
from flask import Blueprint,request
import json 
from my_util import print_if_dev 

mynews =Blueprint("news", __name__, url_prefix="/news")


@mynews.route('',methods=['POST'])
def get_news():
  
  

  data = request.json['data']
  page = data['page'] if data['page'] else 1  
  pageSize = 5
  queryParams = {'page': page, 'pageSize': pageSize,'apiKey':CONFIGS.NEWSAPI_APIKEY,'sources':'ESPN'}

  resp = requests.get(url=CONFIGS.NEWSAPI_ENDPOINT ,params=queryParams)
  content = json.loads(resp.content) 
  articles = content["articles"]
  
  responseDict = {
    "data":articles,
    "pageNum":page,
    "pageSize":pageSize,
    "totalItems":content["totalResults"],
    "totalPages":math.ceil(content["totalResults"]/pageSize)
  }
  
  return {
    "data":responseDict,
    "code": CONFIGS.endpointMsgCodes["success"]
  },200