// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';

// services
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';
import { BaseService } from '@core/base/base.service';

// rxjs
import { Subject } from 'rxjs';
import { takeUntil,tap } from 'rxjs/operators';

// misc
import { ENV } from '@app/core/config/configs';
import { WMLButton, WMLImage, WMLUIProperty } from '@windmillcode/wml-components-base';

@Component({
  selector: 'mobile-nav-item-pod',
  templateUrl: './mobile-nav-item-pod.component.html',
  styleUrls: ['./mobile-nav-item-pod.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
  encapsulation:ViewEncapsulation.None
})
export class MobileNavItemPodComponent  {

  constructor(
    private cdref:ChangeDetectorRef,
    private utilService:UtilityService,
    private configService:ConfigService,
    private baseService:BaseService
  ) { }
  classPrefix = this.utilService.generateClassPrefix('MobileNavItemPod')  
  @HostBinding('class') myClass: string = this.classPrefix(`View`);
  ngUnsub= new Subject<void>()  
  @Input('params') meta!:MobileNavItemPodParams

  ngOnInit(): void {
    
  }

  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }  

}


export class MobileNavItemPodParams  {
  constructor(params:Partial<MobileNavItemPodParams>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
  type:"img" | "btn" | "link" ="link"
  mainPod= new WMLUIProperty()
  link = new WMLUIProperty()
  btn = new WMLButton()
  img = new WMLImage()
}

