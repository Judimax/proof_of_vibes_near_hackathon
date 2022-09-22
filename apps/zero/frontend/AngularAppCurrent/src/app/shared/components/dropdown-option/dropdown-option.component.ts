// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { WMLWrapper } from '@shared/wml-components/models';

// rxjs
import { BehaviorSubject, Subject } from 'rxjs';
import {  tap,takeUntil } from "rxjs/operators";

@Component({
  selector: 'dropdown-option',
  templateUrl: './dropdown-option.component.html',
  styleUrls: ['./dropdown-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownOptionComponent implements OnInit {


  @Input('meta') meta: DropdownOptionMeta = new DropdownOptionMeta();
  @HostBinding('class') myClass: string = `View`;
  @HostBinding('style.position') stylePosition: string = "inital";

  ngUnsub= new Subject<void>()
  constructor(
    private cdref:ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.meta.updateStylePositionSubj
    .pipe(
    takeUntil(this.ngUnsub),
      tap((position)=>{
        this.stylePosition = position
      })
    )
    .subscribe()

  }

  ngAfterViewInit(){
    this.meta.view.cdref = this.cdref
  }

  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }


}

export class DropdownOptionMeta extends WMLWrapper{
  constructor(params:Partial<DropdownOptionMeta>={}){
    super();
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
  
  updateStylePositionSubj = new Subject<"absolute" | "relative">()
  style:any = {}
  title:string= "My Option"
  subTitle:string = "My Subtext"
  selectChevronIsPresent =false
}
