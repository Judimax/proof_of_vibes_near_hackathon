// angular
import { LowerCasePipe, TitleCasePipe } from '@angular/common';
import { Injectable } from '@angular/core';

// i18n
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MobileNavItemPodComponent, MobileNavItemPodParams } from '@shared/components/mobile-nav-item-pod/mobile-nav-item-pod.component';
import { WMLButton, WMLUIProperty } from '@windmillcode/wml-components-base';
import { lastValueFrom } from 'rxjs';
import { MobileNavItemParams } from '../../../../projects/mobile-nav/src/lib/mobile-nav-item/mobile-nav-item.component';


@Injectable({
  providedIn: 'root',

})
export class UtilityService {

  constructor(
    public translateService: TranslateService,

  ) { }


  generateRandomNumber = (range: number = 100, additional: number = 0) => {
    return Math.floor(Math.random() * range) + additional
  }

  generateRandomColor = () => {
    return `#${this.generateRandomNumber(0xFFFFFF).toString(16)}`
  }

  selectRandomOptionFromArray = (myArray: Array<any>, index?: number) => {
    return myArray[this.generateRandomNumber(index ?? myArray.length)]
  }



  changeLanguage(langCode:string){
    this.translateService.use(langCode)
  }




  eventDispatcher(event: string, element: HTMLElement | Window | Element) {

    try {
      let eventModern = new Event(event)
      element.dispatchEvent(eventModern)
    }
    catch (e) {
      let eventLegacy = document.createEvent("Event");
      eventLegacy.initEvent(event, false, true);
      element.dispatchEvent(eventLegacy)
    }
  }

  numberParse(dimension: any /* string or array */): number {

    if (typeof dimension === "string") {
      return parseFloat(dimension.split("p")[0])
    }
    else {
      return dimension
        .map((x: string) => {
          return parseFloat(x.split("p")[0])
        })
    }
  }
  generateClassPrefix(prefix:string) {
    return (val: string) => {
      return prefix + val
    }
  }



  clearArray(A: Array<any>) {
    A.splice(0,A.length)
  }

  generateMobileNavLinkItem(i18nKey:string,click:WMLUIProperty["click"]){
    return new MobileNavItemParams({
      cpnt:MobileNavItemPodComponent,
      meta: new MobileNavItemPodParams({
        mainPod:new WMLUIProperty({
          style:{
            "justifyContent":"flex-start",
            border:"none"
          }
        }),
        link:new WMLUIProperty({
          value:i18nKey,
          click,
          style:{
            fontSize:"1.5rem"
          }
        })
      })
    })    
  }

  generateMobileNavBtnItem(params:GenerateMobileNavBtnItemParams){
    
    return new MobileNavItemParams({
      cpnt:MobileNavItemPodComponent,
      meta: new MobileNavItemPodParams({
        mainPod:new WMLUIProperty({
          style:{
            border:"none"
          }
        }),
        type:"btn",
        btn:new WMLButton({
          value:params.i18nKey,
          click:params.btnClick,
          class:params.btnClass,
          iconIsPresent:params.btnIconIsPresent,
          iconSrc:params.btnIconSrc,
          iconAlt:params.btnIconAlt,          
        }),
      })
    }) 
  }

  makeLowerCase = new LowerCasePipe().transform
  makeTitleCase = new TitleCasePipe().transform
}


export class GenerateMobileNavBtnItemParams {
  constructor(params:Partial<GenerateMobileNavBtnItemParams>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
  i18nKey!:WMLButton["value"]
  btnClick!:WMLButton["click"]
  btnClass:WMLButton["class"]
  btnIconIsPresent!:WMLButton["iconIsPresent"]
  btnIconSrc!:WMLButton["iconSrc"]
  btnIconAlt!:WMLButton["iconAlt"]  
}