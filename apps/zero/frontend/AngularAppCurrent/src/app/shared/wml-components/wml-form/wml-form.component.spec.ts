// testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestingModuleForComponents, grabComponentInstance, mockTranslateService } from '@app/core/utility/test-utils';

// RXJS
import { Subject } from 'rxjs';

// wml components
import { WMLField } from '../wml-fields/wml-fields.component';

import { WmlFormComponent } from './wml-form.component';

describe('WmlFormComponent', () => {
  let cpnt: WmlFormComponent;
  let fixture: ComponentFixture<WmlFormComponent>;

  beforeEach(async () => {
    await configureTestingModuleForComponents(WmlFormComponent,{mockTranslateService});
    ({fixture, cpnt} =  grabComponentInstance(WmlFormComponent));
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
      expect(cpnt.fields).toBeInstanceOf(Array<WMLField>)
      expect(cpnt.ngUnsub).toBeInstanceOf(Subject<void>)
    })
  })

  describe("ngOnDestroy",()=>{

    beforeEach(()=>{
      spyOn(cpnt.ngUnsub,'next')
      spyOn(cpnt.ngUnsub,'complete')
    })
    
    it(` when called | 
     as appropriate | 
     does the required action `,()=>{
        // act
        cpnt.ngOnDestroy();

        // assert
        expect(cpnt.ngUnsub.next).toHaveBeenCalled();
        expect(cpnt.ngUnsub.complete).toHaveBeenCalled();
    })
  })
});
