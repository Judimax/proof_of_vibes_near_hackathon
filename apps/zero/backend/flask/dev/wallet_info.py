from configs import CONFIGS
import requests;
import math
from flask import Blueprint,request
import json 
from my_util import print_if_dev 

mywalletinfo =Blueprint("news", __name__, url_prefix="/wallet_info")




@mywalletinfo.route('',methods=['GET'])
def get_wallet_info():
  
  

  responseDict = {
    "mintbase_api_key":CONFIGS.mintbase['api_key']
  }
  
  return {
    "data":responseDict,
    "code": CONFIGS.endpointMsgCodes["success"]
  },200