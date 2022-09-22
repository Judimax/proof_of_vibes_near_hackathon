import { Type, ViewContainerRef } from "@angular/core";

export let addCustomComponent =(vcf:ViewContainerRef,cpnt:Type<any>,meta:any)=>{
  let {instance} =  vcf.createComponent(cpnt )
  instance.meta =meta
  // instance.ngOnInit()
}