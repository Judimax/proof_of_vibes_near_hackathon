// testing
import { ComponentFixture } from '@angular/core/testing';
import { configureTestingModuleForComponents, grabComponentInstance, mockTranslateService } from '@app/core/utility/test-utils';

// rxjs
import { Subject } from 'rxjs';

import { FooterComponent, FooterContactListItem } from './footer.component';


fdescribe('FooterComponent', () => {
  let cpnt: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let cpntName = 'Footer'

  beforeEach(async () => {
    await configureTestingModuleForComponents(FooterComponent,{mockTranslateService});
    ({fixture, cpnt} =  grabComponentInstance(FooterComponent));
    fixture.detectChanges()
  })

  describe("init", () => {

    it("should create", () => {
      expect(cpnt).toBeTruthy()
    })  

    it("should have all values initalize properly", () => {
      expect(cpnt.myClass).toEqual(cpntName+'View')
    })

    it("should have all properties be the correct class instance", () => {
      expect(cpnt.ngUnsub).toBeInstanceOf(Subject<void>)
      cpnt.contactItems
      .forEach((item)=>{
        expect(item).toBeInstanceOf(FooterContactListItem)
      })
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
