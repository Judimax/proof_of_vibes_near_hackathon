import os

class DevConfigs:
  
  endpointMsgCodes = {
    'success':'OK',
    'error':'ERROR',
  }
  NEWSAPI_APIKEY =os.getenv("NEWSAPI_KEY")
  NEWSAPI_ENDPOINT ="https://newsapi.org/v2/top-headlines"
  app= {
    'access_control_allow_origin':['http://localhost:4200'],
    'flask_env':'development'
  }

  mintbase = {
    'api_key':os.getenv("MINTBASE_API_KEY")
  }
 
class TestConfigs(DevConfigs):
  None


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
  'DEV':lambda x:DevConfigs(),
  'TEST':lambda x:TestConfigs(),
}[os.getenv("FLASK_BACKEND_ENV")](None)







