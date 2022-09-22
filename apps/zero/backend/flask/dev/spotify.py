import json
from my_util import generate_random_string,pp,print_if_dev
from configs import CONFIGS
import requests;
from flask import Blueprint,request,redirect
from urllib.parse import urlencode,urlparse, parse_qs
from requests.auth import HTTPBasicAuth



myspotify =Blueprint("spotify", __name__, url_prefix="/spotify")

state_key = 'spotify_auth_state'
client_redirect_url = lambda host_url: "{}/{}".format(host_url,"spotify/login_callback")

@myspotify.route('/login',methods=['GET'])
def authorize_app_to_access_end_user_acct():
  print_if_dev(request.cookies.get('spotify_refresh_token'),True)
  my_state = generate_random_string(16) 
  query_string = urlencode({
    'show_dialog':CONFIGS.spotify["show_dialog_to_change_spotify_user_acct"],
    'response_type': 'code',
    'client_id': CONFIGS.spotify['client_id'],
    'scope': CONFIGS.spotify["client_scope"], 
    'redirect_uri': client_redirect_url(CONFIGS.app['domain_name']),
    'state': my_state
  })
  spotify_redirect_url = "https://accounts.spotify.com/authorize?{}".format(query_string)
  redirect_resp = redirect(spotify_redirect_url,code=302)
  redirect_resp.set_cookie(
    state_key,
    my_state,
    domain=CONFIGS.app['frontend_angular_app_domain'],
    httponly=True,
    secure=True
    )

  return redirect_resp


@myspotify.route('/login_callback',methods=['GET'])
def take_actions_after_spotify_authorization_request():

  parsed_auth_info = urlparse(request.url)
  parsed_auth_info_dict = parse_qs(parsed_auth_info.query)
  code = parsed_auth_info_dict['code'][0]
  state = parsed_auth_info_dict['state'][0]
  auth_data = get_refresh_and_access_token(code)
  query_string = urlencode({
    'spotify_access_token':auth_data['access_token']
  })
  redirect_resp = redirect("{}?{}".format(CONFIGS.app['frontend_angular_app_url'],query_string),code=302)
  redirect_resp.set_cookie(
    'spotify_refresh_token',
    auth_data['refresh_token'],
    domain=CONFIGS.app['frontend_angular_app_domain'],
    httponly=True,
    samesite="Lax",
    secure=True
  )
  
  return redirect_resp
  
@myspotify.route('/add_item_to_playlist',methods=['POST'])
def add_item_to_playlist_spotify():
  access_token = request.json['data']['access_token']
  playlist_id = request.json['data']['playlist_id']
  item_id = request.json['data']['item_id']
  
  url = "https://api.spotify.com/v1/playlists/{}/tracks".format(playlist_id)
  headers = {"Authorization": "Bearer {}".format(access_token)}
  req_body = {
    'uris':[
      item_id
    ]
  }
  resp = requests.post(url,json=req_body,headers=headers) 
  return {
    'code':CONFIGS.endpointMsgCodes['success']
  },200
   
  
  
  
@myspotify.route('/get_users_playlists',methods=['POST'])
def get_users_playlists_info_spotify():

  frontend_req_body =json.loads(request.data)['data']
  access_token = frontend_req_body['access_token']
  user_data = get_user_info(access_token)
  user_partial_playlists = get_users_playlists_spotify(access_token,user_data['id'])
  users_playlist_info = {
    'playlists':user_partial_playlists['items'],
  }
  return {
    'data':users_playlist_info,
    'code': CONFIGS.endpointMsgCodes["success"]
  }, 200
  

  

def get_user_info(access_token): 
  url = "https://api.spotify.com/v1/me"
  headers = {"Authorization": "Bearer {}".format(access_token)}
  resp = requests.get(url,headers=headers)
  return resp.json()
  

def get_users_playlists_spotify(access_token,user_id):
  query_string = urlencode({
    'limit':50
  })
  url = "https://api.spotify.com/v1/users/{}/playlists?{}".format(user_id,query_string)
  headers = {"Authorization": "Bearer {}".format(access_token)}
  resp = requests.get(url,headers=headers)
  # get_top_of_the_league_track(access_token,resp.json()['items'][0]['id'])
  return resp.json()


def get_top_of_the_league_track(access_token,playlist_id):
  url = "https://api.spotify.com/v1/playlists/{}/tracks".format(playlist_id)
  headers = {"Authorization": "Bearer {}".format(access_token)}
  resp = requests.get(url,headers=headers)
  print_if_dev(resp.json(),True)
  
  

  

def get_refresh_and_access_token(code):
  url = "https://accounts.spotify.com/api/token"
  req_body = {
    'code':code,
    'redirect_uri':client_redirect_url(CONFIGS.app['domain_name']),
    'grant_type': 'authorization_code'
  }

  
  auth = HTTPBasicAuth(CONFIGS.spotify['client_id'],CONFIGS.spotify['client_secret'])
  response = requests.post(url,data=req_body,auth= auth)
  auth_data = response.json()
  return auth_data


  