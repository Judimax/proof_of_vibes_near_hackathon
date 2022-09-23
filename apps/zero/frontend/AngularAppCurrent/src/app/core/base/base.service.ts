import { ChangeDetectorRef, Injectable } from '@angular/core';
import { delay, finalize, ReplaySubject, Subject, tap } from 'rxjs';

// services
import { UtilityService } from '@core/utility/utility.service';

// wml components
import { WMLButton, WMLUIProperty } from '@shared/wml-components/models';
import { FormControl, FormGroup } from '@angular/forms';
import { WMLField } from '@shared/wml-components/wml-fields/wml-fields.component';
import { CustomLabelComponent } from '@shared/components/custom-label/custom-label.component';
import { WmlLabelMeta } from '@shared/wml-components/wml-fields/wml-label/wml-label.component';

// mintbase
import { Network } from 'mintbase';
import { HttpClient } from '@angular/common/http';
import { ENV } from '@environment/environment';



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

  nearWalletAcctInfo = {
    name:"michaelodumosu29.testnet",
    network:Network.testnet
  }
  

  getWalletInfo = ()=>{
    return this.http.get(
      ENV.generateNFT.getWalletInfo()
    )
  }
  
  

  generateInputFormField=(labelValue:string,fieldFormControlName,fieldParentForm,errorMsgs:WmlLabelMeta["errorMsgs"])=>{

    return this.generateFormField(
      new WMLField({
        type: "custom",
        custom: {
          selfType: "wml-card",
          fieldParentForm,
          fieldFormControlName,
          labelValue,
          errorMsgs
        }
      })
    )
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
