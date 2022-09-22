// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, 
  HostBinding, HostListener, Input, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';

// services
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';

// rxjs
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

// misc
import { addCustomComponent } from '@shared/wml-components/functions';
import { WmlDropdownMeta, WmlDropdownParentSubjParams } from '../wml-dropdown.component';
import { WMLWrapper } from '@shared/wml-components/models';
import { WmlDropdownSampleComponent } from '../wml-dropdown-sample/wml-dropdown-sample.component';

@Component({
  selector: 'wml-dropdown-option',
  templateUrl: './wml-dropdown-option.component.html',
  styleUrls: ['./wml-dropdown-option.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class WmlDropdownOptionComponent  {

  constructor(
    private cdref:ChangeDetectorRef,
    private utilService:UtilityService,
    private configService:ConfigService
  ) { }
  @HostBinding('class') myClass: string = `View`;
  @Input('meta') meta: WmlDropdownOptionsMeta = new WmlDropdownOptionsMeta();
  @ViewChild("customOption", {read:ViewContainerRef,static:false}) customOption!:ViewContainerRef;
  ngUnsub= new Subject<void>()


  initComponent(){
    this.meta._rootIsReadySubj
    .pipe(
      takeUntil(this.ngUnsub),
      tap(()=>{
    
        this.subscribeToCommunicateWithRootSubj()?.subscribe()
        
      })
    )
    .subscribe()  
    addCustomComponent(this.customOption,this.meta.display.cpnt,this.meta.display.meta)

  }

  initUpdateComponent(){

  }

  @HostListener('click') onClick(){
    
    if(this.meta.type === "option"){
      
      this.meta.isSelected = !this.meta.isSelected 
      this.meta.communicateWithRootOptionSubj.next(
        new WmlDropdownParentSubjParams({
          type:"selectOption",
          option:this.meta
        })
      )

    }
  }

  @HostListener('mousemove') onMouseover(){
    
    if( ["select"].includes(this.meta.type) ){
      

      this.meta.communicateWithParentSubj.next(
        
        new WmlDropdownParentSubjParams({
          type:"showDropdown",
          option:this.meta
        })
      )
    }
  }

  @HostListener('mouseout') onMouseOut() {
    

    this.meta.communicateWithParentSubj.next(
      new WmlDropdownParentSubjParams({
        type: "hideDropdown",
      })
    )

  }  

  subscribeToCommunicateWithRootSubj() {
    if(this.meta._root){
      return this.meta.communicateWithRootOptionSubj
      .pipe(
        takeUntil(this.ngUnsub),
        tap((resp) => {
          this.customOption.clear()
          if(resp.option.isSelected){
            addCustomComponent(this.customOption,resp.option.display.cpnt,resp.option.display.meta)
            this.meta.selected = resp.option
          }
          else{
            addCustomComponent(this.customOption,this.meta.display.cpnt,this.meta.display.meta)
            this.meta.selected = null
          }
          this.meta.communicateWithRootDropdownSubj.next(this.meta.selected)
        })
      )
    }
    else{
      return null
    }

  }


  ngAfterViewInit(): void {
    this.meta.view.cdref = this.cdref
    this.initComponent()
    this.initUpdateComponent()
    
  }

  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }

}

export class WmlDropdownOptionsMeta extends WMLWrapper {
  
    constructor(params:Partial<WmlDropdownOptionsMeta>={}){
      super();
      if(params.dropdownChild){
        params.dropdownChild._root = false
      }
      Object.assign(
        this,
        {
          ...params
        }
      )


    }
    display:{
      cpnt:Type<any>,
      meta:any
    } = {
      cpnt:WmlDropdownSampleComponent,
      meta:{}
    }
    selected?:WmlDropdownOptionsMeta | null
    isSelected?:boolean = false
    _root= false
    communicateWithRootDropdownSubj:Subject<WmlDropdownOptionsMeta | null> = new Subject<WmlDropdownOptionsMeta | null>()
    communicateWithRootOptionSubj:Subject<WmlDropdownParentSubjParams> = new Subject<WmlDropdownParentSubjParams>()
    communicateWithParentSubj:Subject<WmlDropdownParentSubjParams> = new Subject<WmlDropdownParentSubjParams>()
    class?:"Pod0Item0" | "Pod0Item1"= "Pod0Item1" 
    sourceValue?:any
    type:"select" | "autocomplete" | "option" | "noSelect" = "option"
    displayType: "optionFirst" | "dropdownFirst" = "optionFirst"
    parentOption!:WmlDropdownOptionsMeta
    parentDropdown!:WmlDropdownMeta
    rootOption!:WmlDropdownOptionsMeta
    rootDropdown!:WmlDropdownMeta
    _rootIsReadySubj:Subject<void> = new Subject<void>()
    dropdownChild:WmlDropdownMeta=new WmlDropdownMeta({_root:false});
    
  
}
