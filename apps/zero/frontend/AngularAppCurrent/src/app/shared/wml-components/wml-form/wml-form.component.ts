// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnInit, SimpleChanges } from '@angular/core';

// services
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';

// rxjs
import { Subject } from 'rxjs';

// misc
import { ENV } from '@app/core/config/configs';

// wml components
import { WMLView } from '@shared/wml-components/models';
import { WMLField } from '@shared/wml-components/wml-fields/wml-fields.component';

@Component({
  selector: 'wml-form',
  templateUrl: './wml-form.component.html',
  styleUrls: ['./wml-form.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class WmlFormComponent implements OnInit {

  constructor(
    private cdref:ChangeDetectorRef,
    private utilService:UtilityService,
    private configService:ConfigService
  ) { }
  @HostBinding('class') myClass: string = `View`;
  ngUnsub= new Subject()

  @Input("fields") fields:Array<WMLField> = []
  @Input("view") myView?:WMLView
  displayFields:Array<WMLField>=[]

  initComponent(){

  }

  initUpdateComponent(){

  }


  ngOnInit(): void {
    this.initComponent()
    this.initUpdateComponent()
    
  }

  ngOnChanges(changes:SimpleChanges){

    this.displayFields = changes["fields"].currentValue
    
  }

  ngOnDestroy(){
    this.ngUnsub.next(null);
    this.ngUnsub.complete()
  }

}


export class WMLForm{
  constructor(params:Partial<WMLForm>={}){
    Object.assign(
      this,
      {
        
        ...params
      }
    )
  }

  fields:Array<WMLField> =[]
}