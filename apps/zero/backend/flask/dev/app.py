import os
import sys
from configs import CONFIGS
import my_util
from my_util import print_if_dev
my_util.local_deps()
from flask import Flask, request, redirect
from pyngrok import ngrok


# dev additions
import my_util

from wallet_info import mywalletinfo
from healthcheck import myhealthcheck 


app = Flask(__name__)
app.config.update(
    FLASK_ENV = CONFIGS.app['flask_env'],
    SECRET_KEY=os.environ.get("FLASK_SOCKET_IO_SECRET_KEY")
)

  
app.register_blueprint(mywalletinfo)
app.register_blueprint(myhealthcheck)



@app.after_request
def after_request(response):
  origin =  request.headers.get('Origin',"") 
  
  if origin in CONFIGS.app['access_control_allow_origin'] or CONFIGS.app['access_control_allow_origin'][0] == '*':
    response.headers.add('Access-Control-Allow-Origin', origin)  
  response.headers.add('Access-Control-Allow-Headers', 'Cookie,Content-Type,Authorization, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')

  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH') 
  response.headers.add('Access-Control-Allow-Credentials','true')
  response.headers.add('Allow-Origin-With-Credentials','true') 


  return response



if __name__ == "__main__":
    port = 5000
    app.run()

