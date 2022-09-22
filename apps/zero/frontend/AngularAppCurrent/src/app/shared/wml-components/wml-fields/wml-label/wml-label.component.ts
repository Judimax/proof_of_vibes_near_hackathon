// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnInit } from '@angular/core';

// services
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';
import { BaseService } from '@core/base/base.service';

// rxjs
import { Subject } from 'rxjs';
import { takeUntil,tap } from 'rxjs/operators';

// wml-components
import { WMLWrapper } from '@shared/wml-components/models';
import { WMLField } from '../wml-fields.component';

// reactive-forms
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'wml-label',
  templateUrl: './wml-label.component.html',
  styleUrls: ['./wml-label.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class WmlLabelComponent  {

  constructor(
    private cdref:ChangeDetectorRef,
    private utilService:UtilityService,
    private configService:ConfigService,
    private baseService:BaseService
  ) { }
  classPrefix = this.utilService.generateClassPrefix('WmlLabel')  
  @HostBinding('class') myClass: string = this.classPrefix(`View`);
  ngUnsub= new Subject<void>()  
  @Input('meta') meta = new WmlLabelMeta()
  formControl!:AbstractControl 
  displayErrors:string[] = []


  ngOnInit(): void {
    this.formControl = this.meta.wmlField.field.parentForm.controls[this.meta.wmlField.field.formControlName]
    this.listenForFormControlStatusChanges().subscribe()
  }

  private listenForFormControlStatusChanges() {
    return this.formControl
      .statusChanges
      .pipe(
        takeUntil(this.ngUnsub),
        tap((res) => {

          this.displayErrors = this.meta.toggleErrors(this.formControl);
          this.cdref.detectChanges();
        })
      )
  }

  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }  

}

export class WmlLabelMeta extends WMLWrapper{
  constructor(params:Partial<WmlLabelMeta>={}){
    super(params)
    Object.assign(
      this,
      {
        ...params
      }
    )
    this.labels = this.labels.map((labelLine)=>{
      return labelLine.map((label)=>{
        label.type  = label.type || 'default'
        label.isPresent = (label.isPresent === undefined ? true :label.isPresent ) 
        return label 
      })
    })
  }

  type: 'label' | 'error'  = 'label'
  isPresent:boolean = true
  errorMsgs:{
    [k:string]:string
  } = {}
  labels:{
    type?:"default" | "error" | 'required',
    value:string
    isPresent?:boolean
  }[][] = [
    [
      {
        type:"required",
        value:"*"
      },
      {
        type:"default",
        value:"My Label"
      }      
    ]
  ]
  toggleErrors(formControl:AbstractControl){
    return  Object.keys(formControl.errors ?? {})
    .map((key)=>{
      return this.errorMsgs[key]
    })
  }
  wmlField!:WMLField
}
