// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit, ViewChild } from '@angular/core';

// services
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';
import { BaseService } from '@core/base/base.service';

// rxjs
import { from, Subject, timer } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

// misc
import { ENV } from '@environment/environment.dev';

// wml components
import { WMLButton, WMLImage } from '@windmillcode/wml-components-base';

// near 
import * as nearAPI from "near-api-js";
const { connect, keyStores, WalletConnection } = nearAPI;

@Component({
  selector: 'landing-main',
  templateUrl: './landing-main.component.html',
  styleUrls: ['./landing-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class LandingMainComponent {

  constructor(
    private cdref: ChangeDetectorRef,
    private utilService: UtilityService,
    private configService: ConfigService,
    private baseService: BaseService
  ) { }
  classPrefix = this.utilService.generateClassPrefix('LandingMain')
  @HostBinding('class') myClass: string = this.classPrefix(`View`);
  ngUnsub = new Subject<void>()

  createNearWalletLink = "https://wallet.near.org/create"
  


  connectWalletBtn = new WMLButton({
    click:()=>{
      this.baseService.getNearAndWalletConnection(true)
      .pipe(
        takeUntil(this.ngUnsub),

      )
      .subscribe()
    },
    value:"landingMain.connectWalletBtn"
  })
  ngOnInit(): void {
    // this.initNearWalletLogic()
    
  }

  ngAfterViewInit() {

  }



  ngOnDestroy() {
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }

}


