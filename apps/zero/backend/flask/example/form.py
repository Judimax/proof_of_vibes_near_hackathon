from __main__ import app,request
import json

from configs import CONFIGS

@app.route('/form/submit',methods=['POST'])
def submit_form():
    data = request.json['data']
    print(data)
    dict_variable =  {
      key:{
        "errorMsg":"Please Provide a value for "+key,
      } for (key,value) in data.items()
    }
    return {
      'data':dict_variable,
      'message':CONFIGS['endpointMsgCodes']['error']
    },400 