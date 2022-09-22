import { Injectable } from '@angular/core';
import { WmlDropdownOptionsMeta } from '../wml-dropdown-option/wml-dropdown-option.component';
import { WmlDropdownMeta } from '../wml-dropdown.component';

@Injectable({
  providedIn: 'root'
})
export class WmlDropdownService {

  constructor() { }



  pullAllDropdownOptionsViaDropdown(
    dropdown:WmlDropdownMeta,
    updateFn:(parent:WmlDropdownMeta,parentOption:WmlDropdownOptionsMeta,child:WmlDropdownMeta) => void   = (parent,parentOption,child)=>{}
  ){
    let allOptions:WmlDropdownOptionsMeta[] = [] 
    allOptions.push(...dropdown.options)
    dropdown.options.forEach((option)=>{
      updateFn(dropdown,option,option.dropdownChild)
      allOptions.push(...this.pullAllDropdownOptionsViaDropdown(option.dropdownChild,updateFn))
    })

    return allOptions
  }

  pullAllDropdowns(dropdown:WmlDropdownMeta,filterDanglingDropdowns:boolean = true){
    let allDropdowns:WmlDropdownMeta[] = [] 
    allDropdowns.push(dropdown)
    dropdown.options.forEach((option)=>{
      if(filterDanglingDropdowns){
        if(option.dropdownChild.options.length !== 0){
          allDropdowns.push(...this.pullAllDropdowns(option.dropdownChild))
        }
      }
      else{
        allDropdowns.push(...this.pullAllDropdowns(option.dropdownChild))
      }
    })
    

    return allDropdowns
  }
}
