// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding } from '@angular/core';

// services
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';
import { BaseService } from '@core/base/base.service';

// rxjs
import { Subject } from 'rxjs';

// misc
import { ENV } from '@app/core/config/configs';
import { NavService } from '@shared/services/nav/nav.service';

// wml-components
import { WMLButton, WMLImage, WMLRoute } from '@windmillcode/wml-components-base';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  // changeDetection:ChangeDetectionStrategy.OnPush

})
export class NavComponent  {

  constructor(
    private cdref:ChangeDetectorRef,
    private utilService:UtilityService,
    private configService:ConfigService,
    public baseService:BaseService,
    private navService:NavService
  ) { }
  classPrefix = this.utilService.generateClassPrefix('Nav')  
  @HostBinding('class') myClass: string = this.classPrefix(`View`);
  ngUnsub= new Subject<void>()  



  mainAudioButton = (()=>{
    let btn = new WMLButton({
      value:"nav.topLeft.playSiteAudio",
    })
    btn.click = this.navService.toggleMainAudio(btn)
    return btn
  })()

  spotifyButton = new WMLButton({
    value:"nav.topLeft.addSpotifyButton",
    buttonClass:this.classPrefix("Pod0Button1"),
    iconIsPresent:true,
    iconSrc:"assets/media/nav/0.svg",
    iconAlt:"nav.topLeft.spotifyButton.add",
    click:this.navService.clickSpotifyBtn
  })

  mobileNavMenuIcon = new WMLImage({
    src:"assets/media/nav/1.svg",
    alt:"nav.mobileNav.iconAlt",
    ariaLabel:"nav.mobileNav.iconAlt",
    click:()=>{
      this.baseService.toggleMobileNavSubj.next(true)
      this.mobileNavMenuIcon.ariaExpanded = true
    }
  })

  
  mainNavItems = Array(0)
  .fill(null)
  .map((nullVal,index0)=>{
    return new WMLRoute({
      value:"nav.mainNav."+index0,
      route:[ENV.nav.team,ENV.nav.media,ENV.nav.symbols][index0]
    })
  })



  ngOnInit(): void {
  }



  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }  

}





