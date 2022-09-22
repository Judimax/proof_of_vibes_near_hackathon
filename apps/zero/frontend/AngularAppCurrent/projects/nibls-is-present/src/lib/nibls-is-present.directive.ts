import { ChangeDetectorRef, Directive, HostBinding, Input, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[niblsIsPresent]'
})
export class NiblsIsPresentDirective {
  @Input('niblsIsPresent') params!: NiblsIsPresentParams | null;
  @HostBinding('style.display') styleDisplay!:string

  constructor(
    private cdref:ChangeDetectorRef
  ) { }


  ngOnChanges(){
    this.toggleShow()
  }

  toggleShow(){
    
    this.styleDisplay = this.params?.isPresent ? (this.params?.styleDisplayPresent ?? "block") : "none"
    this.cdref.detectChanges()
  }

}

export class NiblsIsPresentParams {
  constructor(params:Partial<NiblsIsPresentParams>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
  isPresent:boolean = false
  styleDisplayPresent:CSSStyleDeclaration["display"]   ="flex"
}
