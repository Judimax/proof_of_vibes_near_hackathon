import { DevEnv } from "./environment.dev";

export const environment = {
  production: true
};


class ProdEnv extends DevEnv  {
  
  
  constructor(){
    super()
    this.backendDomain0 = "https://proof-of-vibes-backend-0.onrender.com"
  }
}

export let ENV =  new ProdEnv()