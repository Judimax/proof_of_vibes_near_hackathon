// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

// services
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';
import { BaseService } from '@core/base/base.service';

// rxjs
import { Subject } from 'rxjs';
import { takeUntil,tap } from 'rxjs/operators';

// misc
import { ENV } from '@environment/environment';
import { addCustomComponent, WMLCustomComponent } from '@windmillcode/wml-components-base';

@Component({
  selector: 'app-mobile-nav-item',
  templateUrl: './mobile-nav-item.component.html',
  styleUrls: ['./mobile-nav-item.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class MobileNavItemComponent  {

  constructor(
    private cdref:ChangeDetectorRef,
    private utilService:UtilityService,
    private configService:ConfigService,
    private baseService:BaseService
  ) { }
  classPrefix = this.utilService.generateClassPrefix('MobileNavItem')  
  @HostBinding('class') myClass: string = this.classPrefix(`View`);
  ngUnsub= new Subject<void>() 
  @Input('params') params!:MobileNavItemParams
  @ViewChild("customNavItem",{read:ViewContainerRef,static:true})  customNavItem! :ViewContainerRef
  ngOnInit(): void {
    addCustomComponent(
      this.customNavItem,
      this.params.cpnt,
      this.params.meta
    )    
  }

  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }  

}

export class MobileNavItemParams extends WMLCustomComponent {
  constructor(params:Partial<MobileNavItemParams>={}){
    super()
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
}