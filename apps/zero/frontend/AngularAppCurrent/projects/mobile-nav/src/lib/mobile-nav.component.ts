// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnInit } from '@angular/core';

// services
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';
import { BaseService } from '@core/base/base.service';

// rxjs
import { Subject, timer } from 'rxjs';
import { takeUntil,tap } from 'rxjs/operators';

// misc
import { ENV } from '@app/core/config/configs';
import { MobileNavItemParams } from './mobile-nav-item/mobile-nav-item.component';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class MobileNavComponent  {

  constructor(
    private cdref:ChangeDetectorRef,
    private utilService:UtilityService,
    private configService:ConfigService,
    private baseService:BaseService
  ) { }
  classPrefix = this.utilService.generateClassPrefix('MobileNav')  
  @HostBinding('class') myClass: string = this.classPrefix(`View`);
  ngUnsub= new Subject<void>()  
  @Input('params') params!:MobileNavParams
  mobileDivStyle:Partial<CSSStyleDeclaration> = {}
  
  ngOnInit(): void {
    this.openMobileNav().subscribe()
  }


  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }  

  openMobileNav=()=> {
    return timer(50)
    .pipe(
      takeUntil(this.ngUnsub),
      tap(()=>{
        this.mobileDivStyle = {
          left: "0%"
        };
        this.cdref.detectChanges();
      })
    )

  }

}


export class MobileNavParams {
  constructor(params:Partial<MobileNavParams>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
  navItems:Array<MobileNavItemParams> = []
  closeMobileIconSrc?:string
  closeMobileIconAlt ="Close Mobile Nav"
  closeMobileIconStyle:Partial<CSSStyleDeclaration> ={}
  closeMobileNav:($evt?:Event)=>void = ()=>{
    console.log("click close mobile nav")
  }
  closeMobileAriaLabel:string = "Close Mobile Nav Icon"
}

