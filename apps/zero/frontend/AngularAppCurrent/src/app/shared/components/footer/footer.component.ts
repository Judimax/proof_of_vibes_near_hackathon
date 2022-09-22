// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';

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
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class FooterComponent  {

  constructor(
    private cdref:ChangeDetectorRef,
    private utilService:UtilityService,
    private configService:ConfigService,
    private baseService:BaseService
  ) { }
  classPrefix = this.utilService.generateClassPrefix('Footer')  
  @HostBinding('class') myClass: string = this.classPrefix(`View`);
  ngUnsub= new Subject<void>()  

  contactItems = Array(0)
  .fill(null)
  .map((nullVal,index0)=>{
    return new FooterContactListItem({
      text:"footer.contact.items."+index0,
      download:[false,false,"NIBLS_Presentation.pdf","NIBLS_Whitepapers.pdf"][index0],
      href:[
        "https://www.linkedin.com/company/national-intelligent-blockchain-league-sport/",
        "https://brieflink.com/v/jpsq2",
        "assets/media/footer/presentation.pdf",
        "assets/media/footer/whitepapers.pdf"

      ][index0]
    })
  })

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }  

}


export class FooterContactListItem {
  constructor(params:Partial<FooterContactListItem>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }

  text:string = "Update Me"
  href:string = "www.nibls.com"
  download:boolean | string = true
}