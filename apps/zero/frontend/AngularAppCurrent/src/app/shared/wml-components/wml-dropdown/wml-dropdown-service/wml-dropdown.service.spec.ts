// testing
import { configureTestingModuleForServices } from '@core/utility/test-utils';
import { TestBed } from '@angular/core/testing';


import { WmlDropdownService } from './wml-dropdown.service';

// services
import { UtilityService } from '@core/utility/utility.service';
import { WmlDropdownMeta } from '../wml-dropdown.component';
import { WmlDropdownOptionsMeta } from '../wml-dropdown-option/wml-dropdown-option.component';

describe('WmlDropdownService', () => {
  let service: WmlDropdownService;
  let utilService:UtilityService

  beforeEach(() => {
    service = configureTestingModuleForServices(WmlDropdownService)
    utilService =TestBed.inject(UtilityService)
  });

  describe("init", () => {

    it("should create", () => {
      expect(service).toBeTruthy()
    })  

    it("should have all values initalize properly", () => {
    })

    it("should have all properties be the correct class instance", () => {

    })
  })


  describe("pullAllDropdownOptionsViaDropdown",()=>{
  
    it(` when called | 
     as appropriate | 
     does the required action `,()=>{
      // arrange
      let beginning = utilService.generateRandomNumber(10)
      let dropdown = new WmlDropdownMeta({
        options: Array(beginning)
        .fill(null).map((_)=>{
          let count = utilService.generateRandomNumber(10)
          beginning += count
          return new WmlDropdownOptionsMeta({
            dropdownChild: new WmlDropdownMeta({
              options:  Array(count )
              .fill(null).map((_)=>{
                return new WmlDropdownOptionsMeta({})
              })
            })
          })
        })
      })

      // act
      let allOptions = service.pullAllDropdownOptionsViaDropdown(dropdown)

      // assert
      expect(allOptions.length).toEqual(beginning)

    })


    it(` when called | 
    and a updateFn is provided | 
    does the required action `,()=>{
     // arrange
     let beginning = utilService.generateRandomNumber(10)
     let dropdown = new WmlDropdownMeta({
       options: Array(beginning)
       .fill(null).map((_)=>{
         let count = utilService.generateRandomNumber(10)
         beginning += count
         return new WmlDropdownOptionsMeta({
           dropdownChild: new WmlDropdownMeta({
             options:  Array(count )
             .fill(null).map((_)=>{
               return new WmlDropdownOptionsMeta({})
             })
           })
         })
       })
     })
     let updateFn = (parent:WmlDropdownMeta,parentOption:WmlDropdownOptionsMeta,child:WmlDropdownMeta)=>{

        parent.options.forEach((option)=>{
          (option.class as string) = "test"
        })
        child.options.forEach((option)=>{
          (option.class as string) = "test"
        })
     }

     // act
     let allOptions = service.pullAllDropdownOptionsViaDropdown(dropdown,updateFn)

     // assert
     allOptions.forEach((option)=>{
        expect(option.class as any).toEqual("test")
     })

   })
  })

  /**
   *@TODO: figure out what makes flakey and how to fix it
   */
  xdescribe("pullAllDropdowns",()=>{
    it(` when called | 
     as appropriate | 
     does the required action `,()=>{
      // arrange
      let total = 1
      let dropdown = new WmlDropdownMeta({
        options: Array(utilService.generateRandomNumber(10))
        .fill(null)
        .map((_)=>{
          let count = utilService.generateRandomNumber(10)
          total+=1

          return new WmlDropdownOptionsMeta({
            dropdownChild: new WmlDropdownMeta({
              options:  Array(count )
              .fill(null).map((_)=>{
                
                return new WmlDropdownOptionsMeta({})
              })
            })
          })
        })
      })

      // act
      let allDropdowns = service.pullAllDropdowns(dropdown)

      // assert
      console.log(allDropdowns,allDropdowns.length,total)
      expect(allDropdowns.length).toEqual(total)
    })

    it(` when called | 
     and !filterDanglingDropdowns | 
     does the required action `,()=>{
      // arrange
      let total = 1
      let dropdown = new WmlDropdownMeta({
        options: Array(utilService.generateRandomNumber(10))
        .fill(null)
        .map((_)=>{
          let count = utilService.generateRandomNumber(10)
          total+=1

          return new WmlDropdownOptionsMeta({
            dropdownChild: new WmlDropdownMeta({
              options:  Array(count )
              .fill(null).map((_)=>{
                
                return new WmlDropdownOptionsMeta({})
              })
            })
          })
        })
      })

      // act
      let allDropdowns = service.pullAllDropdowns(dropdown,false)

      // assert
      console.log(allDropdowns,allDropdowns.length,total)
      expect(allDropdowns.length).toEqual(total)
    })    
  })




});
