import { ChangeDetectorRef, Injectable } from '@angular/core';
import {  delay, finalize, from, ReplaySubject, Subject, tap } from 'rxjs';

// services
import { UtilityService } from '@core/utility/utility.service';

// wml components
import { WMLButton, WMLUIProperty } from '@shared/wml-components/models';
import { FormControl, FormGroup } from '@angular/forms';
import { WMLField } from '@shared/wml-components/wml-fields/wml-fields.component';
import { CustomLabelComponent } from '@shared/components/custom-label/custom-label.component';
import { WmlLabelMeta } from '@shared/wml-components/wml-fields/wml-label/wml-label.component';

// mintbase

import { HttpClient } from '@angular/common/http';
import { ENV } from '@environment/environment.dev';
import { Contract, WalletConnection } from 'near-api-js';

// near 
import * as nearAPI from "near-api-js";
import { WmlInputMeta } from '@shared/wml-components/wml-input/wml-input.component';
const { connect, keyStores } = nearAPI;



@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(
    private utilService:UtilityService,
    private http:HttpClient
  ) { }

  appCdRef!:ChangeDetectorRef
  toggleOverlayLoadingSubj=(()=>{
    let subj = new Subject<boolean>()

    subj
    .pipe(
      // delay(3000),
      tap(()=> {
        this.appCdRef.detectChanges()
      })
    )
    .subscribe()
    return subj
  })()
  closeOverlayLoading = finalize(()=>{
    this.toggleOverlayLoadingSubj.next(false)
  })
  playSiteAudioSubj = new Subject<boolean>()
  toggleMobileNavSubj = new Subject<boolean>()

  nearWalletAcctInfo = new  BaseServiceNearWalletAcctInfo()
  
  getNearAndWalletConnection = (login) =>{
    let { keyStores } = nearAPI;
    let myKeyStore = new keyStores.BrowserLocalStorageKeyStore();
    const { connect } = nearAPI;

    const connectionConfig = {
      networkId: "testnet",
      keyStore: myKeyStore, // first create a key store 
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://wallet.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://explorer.testnet.near.org",
    }
    return from(connect(connectionConfig))
    .pipe(
      tap((nearConnection ) => {
        
        let walletConnection = new WalletConnection(
          nearConnection,
          this.nearWalletAcctInfo.accountId
        )
        this.nearWalletAcctInfo.walletConnection = walletConnection
        

        this.nearWalletAcctInfo.accountId = walletConnection.getAccountId() === '' ? this.nearWalletAcctInfo.accountId : walletConnection.getAccountId()
        this.waitForContract()

        if(login){

          this.connectWallet()
        }
      })
    )
  }
  
  nearSignOut=()=>{
    this.nearWalletAcctInfo.walletConnection.signOut()
  }

  waitForContract =  ()=>{
    // @ts-ignore
    this.nearWalletAcctInfo.nftContract =new Contract(
      this.nearWalletAcctInfo.walletConnection.account(),
        this.nearWalletAcctInfo.nftContractName,
        {
          // View methods are read only. They don't modify the state, but usually return some value.
          viewMethods: ["check_token","nft_metadata"],
          // Change methods can modify the state. But you don't receive the returned value when called.
          changeMethods: ["nft_mint"],
        }
      )


  }



  connectWallet = ()=>{
    this.nearWalletAcctInfo.walletConnection.requestSignIn(
      "aurora.fakes.testnet", // contract requesting access
      "Proof Of Vibes", // optional title
      "http://localhost:4200", // optional redirect URL on success
      "http://localhost:4200/failure" // optional redirect URL on failure
    );
  }

  getWalletInfo = ()=>{
    
    return this.http.get(
      ENV.generateNFT.getWalletInfo()
    )
  }
  
  generateInputFormField=(labelValue:string,fieldFormControlName,fieldParentForm,errorMsgs:WmlLabelMeta["errorMsgs"],selfType?)=>{

    return this.generateFormField(
      new WMLField({
        type: "custom",
        custom: {
          
          selfType: selfType ?? "wml-card",
          fieldParentForm,
          fieldFormControlName,
          labelValue,
          errorMsgs
        }
      })
    )
  }

  generateRangeFormField=(labelValue:string,fieldFormControlName,fieldParentForm,errorMsgs?:WmlLabelMeta["errorMsgs"],selfType?)=>{
    let wmlField
    wmlField =      new WMLField({
      type: "custom",
      custom: {
        
        selfType: selfType ?? "standalone",
        fieldParentForm,
        fieldFormControlName,
        labelValue,
        errorMsgs:errorMsgs??{
          required:"value is Required"
        },
        fieldCustomMeta:new WmlInputMeta({
          wmlField,
          type:"range"
        })
      }
    })
    return this.generateFormField(wmlField)
  }

  generateFormField(wmlField:WMLField){
    wmlField.label.custom.cpnt = CustomLabelComponent
    wmlField.error.custom.cpnt = CustomLabelComponent
    return wmlField
  }


  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsDirty({ onlySelf: true });
        control.updateValueAndValidity({ emitEvent: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }
  


}


class BaseServiceNearWalletAcctInfo {
  constructor(params:Partial<BaseService>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
  

    counter = 0
    accountId:string
    network:string
    walletConnection:WalletConnection |any
    configInfo:string
    nftContract:Contract & {nft_mint:Function}
    nftContractName:"nft-frontend-simple-mint.blockhead.testnet"
  
}