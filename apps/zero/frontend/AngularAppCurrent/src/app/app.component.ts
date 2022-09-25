// angular
import { ChangeDetectorRef, Component, HostBinding, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// rxjs
import { filter, Subject, takeUntil, takeWhile, tap } from 'rxjs';

// services
import { NavService } from '@shared/services/nav/nav.service';
import { BaseService } from '@core/base/base.service';

// misc
import { environment as env } from "@environment/environment.dev";
import { ENV } from '@environment/environment.dev';
import { GenerateMobileNavBtnItemParams, UtilityService } from '@core/utility/utility.service';

import { MobileNavParams } from '../../projects/mobile-nav/src/public-api';
import { MobileNavItemParams } from '../../projects/mobile-nav/src/lib/mobile-nav-item/mobile-nav-item.component';
import { MobileNavItemPodComponent, MobileNavItemPodParams } from '@shared/components/mobile-nav-item-pod/mobile-nav-item-pod.component';

// wml-components
import { WMLImage } from '@windmillcode/wml-components-base';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(
    public baseService: BaseService,
    private utilService: UtilityService,
    private cdref: ChangeDetectorRef,
    private vcf: ViewContainerRef,
    private route:ActivatedRoute,
    private router:Router,
    private navService:NavService,
    private http:HttpClient
  ) { }

  classPrefix = this.utilService.generateClassPrefix(ENV.classPrefix.app)
  @HostBinding('class') myClass: string = this.classPrefix(`View`);
  ngUnsub = new Subject<void>()


  headerMobileNavItem =new MobileNavItemParams({
    cpnt:MobileNavItemPodComponent,
    meta: new MobileNavItemPodParams({
      type:"img",
      img:new WMLImage({
        src:"assets/media/shared/logo.png",
        alt:"global.logoImgAlt",
        style:{
          "width":"50%",
          "maxWidth":"calc(100/16 * 1rem)",
          "height":"auto"
        }
      })
    })
  })

  navigateWhenMobileNavItemIsClicked = (destination:string)=>{
    return ($evt)=>{
      $evt.preventDefault()
      this.router.navigateByUrl(destination)
      this.baseService.toggleMobileNavSubj.next(false)
    }
  }
  
  generateNFTMobileNavItem = this.utilService.generateMobileNavLinkItem(
    "Generate Your NFT",
    this.navigateWhenMobileNavItemIsClicked("/generateNFT")
    )
  vibesMapMobileNavItem = this.utilService.generateMobileNavLinkItem(
    "Vibes Map",
    this.navigateWhenMobileNavItemIsClicked("/vibesmap")
    )


  
  mobileNavParams = new MobileNavParams({
    closeMobileAriaLabel:"nav.mobileNav.close.ariaLabel",
    closeMobileNav:()=> {
      this.baseService.toggleMobileNavSubj.next(false)
    },
    closeMobileIconSrc:"assets/media/mobile_nav/0.svg",
    navItems:[
      this.headerMobileNavItem,
      this.generateNFTMobileNavItem,
      this.vibesMapMobileNavItem
    ]
  })

  pullNearWalletParams = ()=>{
    return this.route.queryParams
    .pipe(
      takeUntil(this.ngUnsub),
      takeWhile((userAcctInfo)=> !userAcctInfo['account_id'] ,true),
      filter((userAcctInfo)=> userAcctInfo['account_id']),
      tap(userAcctInfo=>{
        console.log(userAcctInfo)
        this.baseService.nearWalletAcctInfo.accountId = userAcctInfo['account_id']
        this.router.navigateByUrl('/generateNFT')
      })
    )
  }
  



  ngOnInit() {
    this.baseService.getWalletInfo()
    .pipe(
      takeUntil(this.ngUnsub),
      tap((res:any)=>{
        
        this.baseService.nearWalletAcctInfo.accountId = res.data.near_username
        this.baseService.nearWalletAcctInfo.network = res.data.network 

        if(!this.baseService.nearWalletAcctInfo){

        }
      })
    )
    .subscribe()
    this.pullNearWalletParams().subscribe()
  }

  doMiscConfigs() {
    if (env.production) {
      this.vcf.element.nativeElement.removeAttribute("ng-version");
    }

    this.baseService.appCdRef = this.cdref
    ENV.nav.initialURL = window.location.pathname
    this.http.get(ENV.app.backendHealthCheck()).subscribe()
  }

  ngOnDestroy() {
    this.ngUnsub.next()
    this.ngUnsub.complete()
  }

}
