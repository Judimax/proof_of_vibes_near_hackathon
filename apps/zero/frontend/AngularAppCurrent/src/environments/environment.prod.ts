import { DevEnv } from "./environment";

export const environment = {
  production: true
};


class ProdEnv extends DevEnv  {
  
  
  constructor(){
    super()
    this.backendDomain0 = "https://nibls-flask-backend-0.azurewebsites.net"
  }
}

export let ENV =  new ProdEnv()