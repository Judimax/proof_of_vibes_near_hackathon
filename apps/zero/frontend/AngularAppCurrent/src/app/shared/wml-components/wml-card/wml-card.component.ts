import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'wml-card',
  templateUrl: './wml-card.component.html',
  styleUrls: ['./wml-card.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class WmlCardComponent implements OnInit {

  constructor(
    private cdref:ChangeDetectorRef,
    private utilService:UtilityService,
    private configService:ConfigService
  ) { }
  @HostBinding('class') myClass: string = `View`;
  ngUnsub= new Subject()


  initComponent(){

  }

  initUpdateComponent(){

  }


  ngOnInit(): void {
    this.initComponent()
    this.initUpdateComponent()
    
  }

  ngOnDestroy(){
    this.ngUnsub.next(null);
    this.ngUnsub.complete()
  }
}
