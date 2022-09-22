// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';

// services
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';
import { AutomationService } from '@helpers/automation/automation/automation.service';
import { BaseService } from '@core/base/base.service';

// rxjs
import { Subject } from 'rxjs';
import { takeUntil,tap } from 'rxjs/operators';

// misc
import { ENV } from '@app/core/config/configs';
import { ScrollBottomPaginationParams } from '@shared/directives/scroll-bottom-pagination-directive/scroll-bottom-pagination.directive';
import { GetArticlesAPIModel } from '../transformations/models/getArticles';
import { getArticlesAPIModeltoUIModel } from '../transformations/functions';

// wml compoennts
import { WmlNotifyService,WmlNotifyBarType, WmlNotifyBarModel } from '@windmillcode/wml-notify';
import { WMLCustomComponent } from '@windmillcode/wml-components-base';
import { NotifyBannerComponent, NotifyBannerMeta } from '@shared/components/notify-banner/notify-banner.component';

@Component({
  selector: 'media-main',
  templateUrl: './media-main.component.html',
  styleUrls: ['./media-main.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class MediaMainComponent  {

  constructor(
    public cdref:ChangeDetectorRef,
    public utilService:UtilityService,
    public automateService:AutomationService,
    public wmlNotifyService:WmlNotifyService
  ) { }
  classPrefix = this.utilService.generateClassPrefix('MediaMain')  
  @HostBinding('class') myClass: string = this.classPrefix(`View`);
  ngUnsub= new Subject<void>()  

  mediaItems:Array<MediaMainMediaItems> = []
  errorNote =()=>new WmlNotifyBarModel({ 
    type: WmlNotifyBarType.Error,
    msgtype:"custom",
    custom:new WMLCustomComponent({
      cpnt:NotifyBannerComponent,
      meta:new NotifyBannerMeta({
        i18nKey:"mediaMain.wmlNotify.loadArticlesError"
      })
    })
  })


  scrollBottomPaginationParamsPopulateItems = (apiResult:GetArticlesAPIModel)=>{
    
    let uiResult =getArticlesAPIModeltoUIModel(apiResult)
    let data = uiResult.data.map((item) => new MediaMainMediaItems(item))
    this.mediaItems.push(...data)
    
    if(uiResult.pageNum >= uiResult.totalPages){
      this.scrollBottomPaginationParams.stopMakingAPICalls = true
    }
    this.cdref.detectChanges();
  
  }
  scrollBottomPaginationParamsNotifyError = (err,failedApiCalls)=>{
    if(failedApiCalls > 5){
      let finalErrorNote = this.errorNote();
      finalErrorNote.custom.meta.i18nKey ="mediaMain.wmlNotify.stopTryingToLoadArticlesError"
      this.scrollBottomPaginationParams.stopMakingAPICalls = true
      this.wmlNotifyService.create(finalErrorNote)  
    }
    this.wmlNotifyService.create(this.errorNote());      
  }
  scrollBottomPaginationParamsUpdateBody = (()=>{
    let counter = 1 
    return ()=>{
      return {
        "data":{
          "page":counter++
        }
      }
    }
  })()
  scrollBottomPaginationParams = new ScrollBottomPaginationParams({
    populateItems:this.scrollBottomPaginationParamsPopulateItems,
    notifyError:this.scrollBottomPaginationParamsNotifyError,
    apiInfo:{
      endpoint:ENV.mediaMain.articlesEndpoint(),
      method:"POST",
      updateBody:this.scrollBottomPaginationParamsUpdateBody
    },
    elementToDetermineXFromBottom:this.automateService.documentQuerySelector("main")
  });


  ngOnInit(): void {


  }

  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
    this.wmlNotifyService.clear()
  }  

}

export class MediaMainMediaItems {
  constructor(params:Partial<MediaMainMediaItems>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }

  title:string = 'Article'
  imgSrc!:string
  imgAlt!:string 
  desc!:string
  href!:string
}