// angular
import { ChangeDetectorRef, Component, HostBinding, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

// rxjs
import { Subject } from 'rxjs';

// services
import { NavService } from '@shared/services/nav/nav.service';
import { BaseService } from '@core/base/base.service';

// misc
import { environment as env } from "@environment/environment";
import { ENV } from '@core/config/configs';
import { GenerateMobileNavBtnItemParams, UtilityService } from '@core/utility/utility.service';
import { SpotifyPlaylistsParams } from '@shared/components/spotify-playlists/spotify-playlists.component';
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
    private router:Router,
    private navService:NavService,
    private http:HttpClient
  ) { }

  classPrefix = this.utilService.generateClassPrefix(ENV.classPrefix.app)
  @HostBinding('class') myClass: string = this.classPrefix(`View`);
  ngUnsub = new Subject<void>()

  spotifyPlaylistsParams = new SpotifyPlaylistsParams()
  headerMobileNavItem =new MobileNavItemParams({
    cpnt:MobileNavItemPodComponent,
    meta: new MobileNavItemPodParams({
      type:"img",
      img:new WMLImage({
        src:"assets/media/logo_0.png",
        alt:"global.logoImgAlt",
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
  teamMobileNavItem = this.utilService.generateMobileNavLinkItem(
    "nav.mainNav.0",
    this.navigateWhenMobileNavItemIsClicked(ENV.nav.team)
    )
  mediaMobileNavItem = this.utilService.generateMobileNavLinkItem(
    "nav.mainNav.1",
    this.navigateWhenMobileNavItemIsClicked(ENV.nav.media)
    )
  symbolsMobileNavItem = this.utilService.generateMobileNavLinkItem(
    "nav.mainNav.2",
    this.navigateWhenMobileNavItemIsClicked(ENV.nav.symbols)
    )
  playSiteAudioMobileBtnItem =(()=>{
    let btnItem = this.utilService.generateMobileNavBtnItem(new GenerateMobileNavBtnItemParams({
      i18nKey:"nav.topLeft.playSiteAudio",
      btnClass:"AppMobileNavButton0"
    }))

    btnItem.meta.btn.click = this.navService.toggleMainAudio(btnItem.meta.btn)
    return btnItem
  })()
  addToSpotfiyMobileBtnItem = this.utilService.generateMobileNavBtnItem(new GenerateMobileNavBtnItemParams({
    i18nKey:"nav.topLeft.addSpotifyButton",
    btnClass:"AppMobileNavButton1",
    btnIconIsPresent:true,
    btnClick:this.navService.clickSpotifyBtn,
    btnIconSrc:"assets/media/nav/0.svg",
    btnIconAlt:"nav.topLeft.spotifyButton.add",    
  }))
  
  mobileNavParams = new MobileNavParams({
    closeMobileAriaLabel:"nav.mobileNav.close.ariaLabel",
    closeMobileNav:()=> {
      this.baseService.toggleMobileNavSubj.next(false)
    },
    closeMobileIconSrc:"assets/media/mobile_nav/0.svg",
    navItems:[
      this.headerMobileNavItem,
      this.teamMobileNavItem,
      this.mediaMobileNavItem,
      this.symbolsMobileNavItem,
      this.playSiteAudioMobileBtnItem,
      this.addToSpotfiyMobileBtnItem      
    ]
  })
  


  ngOnInit() {
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
