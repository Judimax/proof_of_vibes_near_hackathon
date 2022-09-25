// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding } from '@angular/core';

// services
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';
import { BaseService } from '@core/base/base.service';

// rxjs
import { Subject } from 'rxjs';

// misc
import { ENV } from '@environment/environment';
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





  openMobileNav = () =>{

    this.baseService.toggleMobileNavSubj.next(true)
    
  }

  
  mainNavItems = ["Generate Your NFT","Vibes Map"]
  .map((value,index0)=>{
    return new WMLRoute({
      value,
      route:["/generateNFT","/vibesmap"][index0]
    })
  })



  ngOnInit(): void {
  }



  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }  

}





