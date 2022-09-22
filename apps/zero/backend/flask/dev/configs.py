import os

class DevConfigs:
  
  endpointMsgCodes = {
    'success':'OK',
    'error':'ERROR',
  }
  NEWSAPI_APIKEY =os.getenv("NEWSAPI_KEY")
  NEWSAPI_ENDPOINT ="https://newsapi.org/v2/top-headlines"
  app= {
    'access_control_allow_origin':['https://example.com:4200'],
    'server_name':'example.com:5000',
    'domain_name':'https://example.com:5000',
    'flask_env':'development',
    'frontend_angular_app_url':'https://example.com:4200',
    'frontend_angular_app_domain':'example.com'
  }
  spotify = {
    'client_id':os.getenv("SPOTIFY_APP_0_CLIENT_ID"),
    'client_secret':os.getenv("SPOTIFY_APP_0_CLIENT_SECRET"),
    'client_scope':'user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative',
    'show_dialog_to_change_spotify_user_acct':False
  }
 
class TestConfigs(DevConfigs):
  None

class PreviewConfigs(DevConfigs):
  
  def __init__(self) -> None:
    super().__init__()
    self.app['flask_env'] = 'development'
    self.app['server_name']= "169.254.129.3"
    self.app['domain_name'] = 'https://nibls-flask-backend-0.azurewebsites.net'
    self.app['access_control_allow_origin']= ["https://ambitious-sand-0ab399110-preview.centralus.1.azurestaticapps.net"]
    self.app['frontend_angular_app_url'] = self.app['access_control_allow_origin'][0]
    self.app['frontend_angular_app_domain'] = "ambitious-sand-0ab399110-preview.centralus.1.azurestaticapps.net"
    self.spotify['show_dialog_to_change_spotify_user_acct'] = True
    

class ProdConfigs(DevConfigs):
  
  def __init__(self) -> None:
    super().__init__()
    self.app['flask_env'] = 'production'
    self.app['server_name']= "169.254.129.3"
    self.app['domain_name'] = 'https://nibls-flask-backend-0.azurewebsites.net'
    self.app['access_control_allow_origin']= ["https://www.niblscoin.com"]
    self.app['frontend_angular_app_url'] = self.app['access_control_allow_origin'][0]
    self.app['frontend_angular_app_domain'] ='niblscoin.com'
    self.spotify['show_dialog_to_change_spotify_user_acct'] = True
    
CONFIGS= {
  'PROD':lambda x:ProdConfigs(),
  'PREVIEW':lambda x:PreviewConfigs(),
  'DEV':lambda x:DevConfigs(),
  'TEST':lambda x:TestConfigs(),
}[os.getenv("FLASK_BACKEND_ENV")](None)







