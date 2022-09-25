// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

export class DevEnv {

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
  backendDomain0 ="https://proof-of-vibes-backend-0.onrender.com"
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
    getWalletInfo:() =>this.backendDomain0 + "/wallet_info",
    nameFieldFormControlName:"name",
    emailFieldFormControlName:"email",
    dobFieldFormControlName:"dob",
    genderFieldFormControlName:"gender",
    phoneFieldFormControlName:"phone"
  }

  // FieldFormControlName
  vibesMap = {
    fieldFormControlName:{
      "energy":"energy",
      "density":"density",
      "anmity":"anmity"
    }
    

  }


}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

export let ENV =  new DevEnv()