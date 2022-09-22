// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnInit } from '@angular/core';

// services
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';
import { BaseService } from '@core/base/base.service';

// rxjs
import { Subject } from 'rxjs';
import { takeUntil,tap } from 'rxjs/operators';

// misc
import { ENV } from '@app/core/config/configs';

@Component({
  selector: 'notify-banner',
  templateUrl: './notify-banner.component.html',
  styleUrls: ['./notify-banner.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class NotifyBannerComponent  {

  constructor(
    private cdref:ChangeDetectorRef,
    private utilService:UtilityService,
    private configService:ConfigService,
    private baseService:BaseService
  ) { }
  classPrefix = this.utilService.generateClassPrefix('NotifyBanner')  
  @HostBinding('class') myClass: string = this.classPrefix(`View`);
  ngUnsub= new Subject<void>()  
  @Input('meta') meta :NotifyBannerMeta = new NotifyBannerMeta();

  ngOnInit(){}

  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }  

}


export class NotifyBannerMeta {
  constructor(params:Partial<NotifyBannerMeta>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
  i18nKey:string = ""
}