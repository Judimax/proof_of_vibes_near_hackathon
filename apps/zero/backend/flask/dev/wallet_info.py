from configs import CONFIGS
import requests;
import math
from flask import Blueprint,request
import json 
from my_util import print_if_dev 

mywalletinfo =Blueprint("wallet_info", __name__, url_prefix="/wallet_info")



@mywalletinfo.route('',methods=['GET'])
def get_wallet_info():
  
  

  responseDict = {
    "mintbase_api_key":CONFIGS.mintbase['api_key'],
    "near_username":CONFIGS.mintbase['near_username'],
    "network":CONFIGS.mintbase['network'],
  }
  
  return {
    "data":responseDict,
    "code": CONFIGS.endpointMsgCodes["success"]
  },200
  

@mywalletinfo.route('/create_nft',methods=['POST'])
def create_nft():
  data = request.json["data"]
  satori_nft_req_body = {
    'contractId':'proofofvibescollection0.snft.testnet',
    'title':"My NFT Contract",
    'description':"Satori NFT desc",
    'mediaCid':'',
    'copies':100,
    'assets':[["images/proof_of_vibes.png", 100, ""]],
    'coverAsset':'images/proof_of_vibes.png',
    'funding-hash':'EekEfZYV1pfX9ik8hHxteTVd9jBJKngmiE1gvXbeFgR9'
  }
  print_if_dev(satori_nft_req_body,True)
  return {
    'code':'OK',
    'msg':"OK"
  }

