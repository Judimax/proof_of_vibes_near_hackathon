// testing
import { ComponentFixture, fakeAsync, flush } from '@angular/core/testing';
import { configureTestingModuleForComponents, grabComponentInstance, mockTranslateService } from '@app/core/utility/test-utils';

// service
import { UtilityService } from '@core/utility/utility.service';
// rxjs
import { Subject } from 'rxjs';

// wml components
import { WMLField } from '../wml-fields/wml-fields.component';
import { WmlDropdownOptionsMeta } from './wml-dropdown-option/wml-dropdown-option.component';
import { WmlDropdownSampleComponent } from './wml-dropdown-sample/wml-dropdown-sample.component';
import { WmlDropdownService } from './wml-dropdown-service/wml-dropdown.service';
import { WmlDropdownComponent, WmlDropdownMeta, WmlDropdownParentSubjParams } from './wml-dropdown.component';

describe('WmlDropdownComponent', () => {
  let cpnt: WmlDropdownComponent;
  let fixture: ComponentFixture<WmlDropdownComponent>;
  let utilService: UtilityService
  let wmlDropdownService: WmlDropdownService

  beforeEach(async () => {
    await configureTestingModuleForComponents(WmlDropdownComponent, { mockTranslateService });
    ({ fixture, cpnt } = grabComponentInstance(WmlDropdownComponent));
    utilService = fixture.debugElement.injector.get(UtilityService)
    wmlDropdownService = fixture.debugElement.injector.get(WmlDropdownService)
    cpnt.meta.options = [new WmlDropdownOptionsMeta()]
    fixture.detectChanges()
  })


  describe("init", () => {

    it("should create", () => {
      expect(cpnt).toBeTruthy()
    })

    it("should have all values initalize properly", () => {
      expect(cpnt.myClass).toEqual('View')
    })

    it("should have all properties be the correct class instance", () => {
      expect(cpnt.ngUnsub).toBeInstanceOf(Subject<void>)
      expect(cpnt.meta).toBeInstanceOf(WmlDropdownMeta)
    })
  })

  describe("ngOnInit", () => {
    it(` when called | 
     as appropriate | 
     does the required action `, () => {
      // arrange
      spyOn(cpnt, "updateRootDropdownStyle")

      // act
      cpnt.ngOnInit()

      // assert
      expect(cpnt.updateRootDropdownStyle).toHaveBeenCalled()
    })
  })


  describe("ngAfterViewInit", () => {
    beforeEach(() => {
      spyOn(cpnt, "showInitalOptionAndSetAsRoot");

      spyOn(cpnt, "attachParentInformationToChildren");
      spyOn(cpnt, "attachRootInformationToChildren");
      spyOn(cpnt, "subscribeToCommunicateWithParentSubj").and.callThrough()
      spyOn(cpnt, "setCommunicateWithParentSubj");
    })

    it(` when called | 
     as appropriate | 
     does the required action `, () => {

      // act
      cpnt.ngAfterViewInit();

      // assert
      expect(cpnt.showInitalOptionAndSetAsRoot).toHaveBeenCalled();

      expect(cpnt.attachParentInformationToChildren).toHaveBeenCalled();
      expect(cpnt.subscribeToCommunicateWithParentSubj).toHaveBeenCalled();
      expect(cpnt.setCommunicateWithParentSubj).toHaveBeenCalled();
    })
  })

  describe("subscribeToCommunicateWithParentSubj", () => {
    beforeEach(() => {
      spyOn(cpnt, "showDropdown");
      spyOn(cpnt, "hideDropdown");
    })

    it(` when called | 
     and resp.type === "showDropdown" | 
     does the required action `, (() => {

      // arrange
      let obs$ = cpnt.subscribeToCommunicateWithParentSubj();

      obs$.subscribe(() => {
        // assert
        expect(cpnt.showDropdown).toHaveBeenCalled();
        expect(cpnt.hideDropdown).not.toHaveBeenCalled();
      })

      // act
      cpnt.communicateWithParentSubj.next(new WmlDropdownParentSubjParams({
        type: "showDropdown",
        option: new WmlDropdownOptionsMeta({})
      }));



    }))

    it(` when called | 
     and resp.type === "hideDropdown", | 
     does the required action `, (() => {

      // arrange
      let obs$ = cpnt.subscribeToCommunicateWithParentSubj();

      obs$.subscribe(() => {
        // assert
        expect(cpnt.showDropdown).not.toHaveBeenCalled();
        expect(cpnt.hideDropdown).toHaveBeenCalled();
      })

      // act
      cpnt.communicateWithParentSubj.next(new WmlDropdownParentSubjParams({
        type: "hideDropdown",
        option: new WmlDropdownOptionsMeta({})
      }));



    }))

  })

  describe("attachParentInformationToChildren", () => {

    it(` when called | 
     as appropriate | 
     does the required action `, () => {
      // arrange
      cpnt.meta = new WmlDropdownMeta({
        _root: true,
        options: [new WmlDropdownOptionsMeta({
          dropdownChild: new WmlDropdownMeta({
            options: Array(utilService.generateRandomNumber(5))
              .fill(null)
              .map(() => {
                return new WmlDropdownOptionsMeta({})
              })
          })
        })]
      })
      let allOptions = wmlDropdownService.pullAllDropdownOptionsViaDropdown(cpnt.meta)
      allOptions.forEach((option) => {
        spyOn(option._rootIsReadySubj, "next");
      })

      // act
      cpnt.attachParentInformationToChildren();




      // assert
      allOptions.forEach((option, index0) => {
        expect(option._rootIsReadySubj.next).toHaveBeenCalled();

        if (index0 !== 0) {
          /**@TODO figure out how test the exact option */
          expect(option.parentDropdown).toBeDefined()
          expect(option.parentOption).toBeDefined()
        }


      })




    })

    it(` when called | 
    and !this.meta._root | 
    does the required action `, () => {
      // arrange

      cpnt.meta = new WmlDropdownMeta({
        _root: false,
        options: [new WmlDropdownOptionsMeta({
          dropdownChild: new WmlDropdownMeta({
            options: Array(utilService.generateRandomNumber(5))
              .fill(null)
              .map(() => {
                return new WmlDropdownOptionsMeta({})
              })
          })
        })]
      })
      let allOptions = wmlDropdownService.pullAllDropdownOptionsViaDropdown(cpnt.meta)
      allOptions.forEach((option) => {
        spyOn(option._rootIsReadySubj, "next");
      })

      // act
      cpnt.attachParentInformationToChildren();




      // assert
      allOptions.forEach((option) => {
        expect(option._rootIsReadySubj.next).not.toHaveBeenCalled();
        /**@TODO figure out how test the exact option */
        expect(option.parentDropdown).not.toBeDefined()
        expect(option.parentOption).not.toBeDefined()

      })




    })
  })

  describe("attachRootInformationToChildren", () => {
    it(` when called | 
     as appropriate | 
     does the required action `, () => {
      // arrange
      cpnt.meta = new WmlDropdownMeta({
        _root: true,
        options: [new WmlDropdownOptionsMeta({
          dropdownChild: new WmlDropdownMeta({
            options: Array(utilService.generateRandomNumber(5))
              .fill(null)
              .map(() => {
                return new WmlDropdownOptionsMeta({})
              })
          })
        })]
      })

      // act
      cpnt.attachRootInformationToChildren();

      // assert
      let allOptions = wmlDropdownService.pullAllDropdownOptionsViaDropdown(cpnt.meta)

      allOptions.forEach((option) => {


        expect(option.rootOption).toEqual(cpnt.meta.options[0]);
        expect(option.rootDropdown).toEqual(cpnt.meta)
      })


    })

    it(` when called | 
    as appropriate | 
    does the required action `, () => {
      // arrange
      cpnt.meta = new WmlDropdownMeta({
        _root: false,
        options: [new WmlDropdownOptionsMeta({
          dropdownChild: new WmlDropdownMeta({
            options: Array(utilService.generateRandomNumber(5))
              .fill(null)
              .map(() => {
                return new WmlDropdownOptionsMeta({})
              })
          })
        })]
      })

      // act
      cpnt.attachRootInformationToChildren();

      // assert
      let allOptions = wmlDropdownService.pullAllDropdownOptionsViaDropdown(cpnt.meta)

      allOptions.forEach((option) => {


        expect(option.rootOption).not.toEqual(cpnt.meta.options[0]);
        expect(option.rootDropdown).not.toEqual(cpnt.meta)
      })


    })

  })

  describe("updateRootDropdownStyle", () => {

    it(` when called | 
     as appropriate | 
     does the required action `, () => {
      // act
      cpnt.updateRootDropdownStyle();

      // assert
      expect(cpnt.meta.options[0].dropdownChild.dropdownStyle.width).toEqual("100%")
    })

    it(` when called | 
     and !this.meta._root | 
     does the required action `, () => {

      // arrange
      cpnt.meta.options[0] = new WmlDropdownOptionsMeta()
      cpnt.meta._root = false;

      // act
      cpnt.updateRootDropdownStyle();

      // assert
      expect(cpnt.meta.options[0].dropdownChild.dropdownStyle.width).not.toEqual("100%")
    })
  })


  describe("showInitalOptionAndSetAsRoot", () => {

    it(` when called | 
     as appropriate | 
     does the required action `, () => {


      // act
      cpnt.showInitalOptionAndSetAsRoot();

      // assert
      expect(cpnt.meta.options[0].class).toEqual("Pod0Item0")
      expect(cpnt.meta.options[0]._root).toEqual(true)
    })

    it(` when called | 
     and  !this.meta._root| 
     does the required action `, () => {

      // arrage
      cpnt.meta._root = false
      cpnt.meta.options[0] = new WmlDropdownOptionsMeta()


      // act
      cpnt.showInitalOptionAndSetAsRoot();

      // assert
      expect(cpnt.meta.options[0].class).not.toEqual("Pod0Item0")
      expect(cpnt.meta.options[0]._root).not.toEqual(true)
    })

    it(` when called | 
    and  !this.meta._root| 
    does the required action `, () => {

      // arrage
      cpnt.meta.options = []


      // act
      cpnt.showInitalOptionAndSetAsRoot();

      // assert
      expect(cpnt.meta.options[0].class).toEqual("Pod0Item0")
      expect(cpnt.meta.options[0]._root).toEqual(true)
      expect(cpnt.meta.options[0].display.cpnt).toEqual(WmlDropdownSampleComponent)
    })
  })


  describe("showDropdown", () => {
    it(` when called | 
     as appropriate | 
     does the required action `, () => {
      // arrange
      let resp = new WmlDropdownParentSubjParams({
        type: "showDropdown",
        option: new WmlDropdownOptionsMeta({
          dropdownChild: new WmlDropdownMeta({
            options: Array(utilService.generateRandomNumber(10))
              .fill(null).map((_) => {
                return new WmlDropdownOptionsMeta({})
              })
          })
        })
      })

      // act
      cpnt.showDropdown(resp);

      // assert
      resp.option.dropdownChild.options.forEach((option) => {
        expect(option.class).toEqual("Pod0Item0");

      });

    })
  })

  describe("hideDropdown", () => {
    it(` when called | 
     as appropriate | 
     does the required action `, () => {
      // arrange
      cpnt.meta = new WmlDropdownMeta({
        options: Array(utilService.generateRandomNumber(3))
          .fill(null).map((_) => {
            return new WmlDropdownOptionsMeta({
              dropdownChild: new WmlDropdownMeta({
                options: Array(utilService.generateRandomNumber(3))
                  .fill(null).map((_) => {
                    return new WmlDropdownOptionsMeta({})
                  })
              })
            })
          })
      })
      let resp = new WmlDropdownParentSubjParams({
        type: "hideDropdown",
        option: cpnt.meta.options[0]
      })

      // act
      cpnt.hideDropdown(resp);

      // assert
      cpnt.meta.options.forEach((option) => {
        option.dropdownChild.options.forEach((option1) => {
          expect(option1.class).toEqual("Pod0Item1");
        })

      })

    })
  })


  describe("setCommunicateWithParentSubj", () => {
    it(` when called | 
     as appropriate | 
     does the required action `, () => {
      // act
      cpnt.setCommunicateWithParentSubj();

      // assert
      cpnt.meta.options.forEach((option) => {
        expect(option.communicateWithParentSubj).toEqual(cpnt.communicateWithParentSubj)
      });
    })
  })

  describe("WmlDropdownParentSubjParams", () => {

    it(` when instaiated | 
     as appropriate | 
     does the required action `, () => {
      // arrange
      let option = new WmlDropdownOptionsMeta({})
      let resp = new WmlDropdownParentSubjParams({
        type: "showDropdown",
        option
      })


      // assert
      expect(resp.type).toEqual("showDropdown")
      expect(resp.option).toEqual(option)
    })
  })

  describe("WmlDropdownMeta", () => {
    it(` when called | 
     as appropriate | 
     does the required action `, () => {
      // arrange
      let optionLength = utilService.generateRandomNumber(3)
      let option = new WmlDropdownOptionsMeta({})
      let resp = new WmlDropdownMeta({
        options: Array(optionLength)
          .fill(null).map((_) => {
            return new WmlDropdownOptionsMeta({})
          }),
        _root: false,
        wmlField: new WMLField(),
        dropdownStyle: { width: "100%" }
      })


      // assert
      expect(resp._root).toBeFalse()
      expect(resp.wmlField).toBeInstanceOf(WMLField)
      expect(resp.options.length).toEqual(optionLength)
      expect(resp.dropdownStyle.width).toEqual("100%")
    })
  })



  describe("ngOnDestroy", () => {

    beforeEach(() => {
      spyOn(cpnt.ngUnsub, 'next')
      spyOn(cpnt.ngUnsub, 'complete')
    })

    it(` when called | 
     as appropriate | 
     does the required action `, () => {
      // act
      cpnt.ngOnDestroy();

      // assert
      expect(cpnt.ngUnsub.next).toHaveBeenCalled();
      expect(cpnt.ngUnsub.complete).toHaveBeenCalled();
    })
  })
});
