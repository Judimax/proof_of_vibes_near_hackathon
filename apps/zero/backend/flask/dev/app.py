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

from news import mynews 
from healthcheck import myhealthcheck 
from spotify import myspotify

app = Flask(__name__)
app.config.update(
    FLASK_ENV = CONFIGS.app['flask_env'],
    SECRET_KEY=os.environ.get("FLASK_SOCKET_IO_SECRET_KEY")
)
if os.getenv("FLASK_BACKEND_ENV") == "DEV":
  app.config.update(
    SERVER_NAME=CONFIGS.app["server_name"],
  )
app.register_blueprint(mynews)
app.register_blueprint(myhealthcheck)
app.register_blueprint(myspotify)


@app.after_request
def after_request(response):
  origin =  request.headers.get('Origin',"") 
  
  if origin in CONFIGS.app['access_control_allow_origin'] or CONFIGS.app['access_control_allow_origin'][0] == '*':
    response.headers.add('Access-Control-Allow-Origin', origin)  
  response.headers.add('Access-Control-Allow-Headers', 'Cookie,Content-Type,Authorization, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers')
  # response.headers.add('Access-Control-Allow-Headers','*')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH') 
  response.headers.add('Access-Control-Allow-Credentials','true')
  response.headers.add('Allow-Origin-With-Credentials','true') 


  return response



if __name__ == "__main__":
    port = 5000
    if os.getenv("FLASK_BACKEND_ENV") == "DEV":
      app.run(debug=True,ssl_context=('cert.pem','key.pem'))
    else:
      app.run()

