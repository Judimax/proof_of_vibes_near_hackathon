import { environment as env } from '@environment/environment';



class Configs {

  endpointMsgCodes = {
    'success':'OK',
    'error':'ERROR',
  }
  allowedDomains=[
    "https://www.linkedin.com/",
    "https://nibls-flask-backend-0.azurewebsites.net/"
  ];

  app={
    backendHealthCheck:() =>this.backendDomain0 + "/healthz/"
  }
  // backendDomain0 = "http://127.0.0.1:5000"
  backendDomain0 ="https://example.com:5000"
  classPrefix= {
    certsMain:"CertsMain",
    footer:"Footer",
    mediaMain:"MediaMain",
    teamMain:"TeamMain",
    app:"App"
  }

  mediaMain = {
    articlesEndpoint:() =>this.backendDomain0  + "/news"
  }
  
  nav = {
    home:"/",
    homeAlt:"/home",
    team:"/team",
    media:"/media",
    symbols:"/symbols",
    startURL:"/intro",
    initialURL:"",
    spotifyLoginEndpoint:() => this.backendDomain0 + "/spotify/login"
  }

  generateNFT = {
    nameFieldFormControlName:"name",
    emailFieldFormControlName:"email",
    dobFieldFormControlName:"dob",
    genderFieldFormControlName:"gender",
    phoneFieldFormControlName:"phone"
  }


}

class DefaultConfigs extends Configs  {
  
  
  constructor(){
    super()
    this.backendDomain0 = "https://nibls-flask-backend-0.azurewebsites.net"
  }
}

export let ENV = !env.production    ?  new Configs() : new DefaultConfigs()