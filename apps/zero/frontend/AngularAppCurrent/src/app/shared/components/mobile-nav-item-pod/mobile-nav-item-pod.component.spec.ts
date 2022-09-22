// testing
import { ComponentFixture } from '@angular/core/testing';
import { configureTestingModuleForComponents, grabComponentInstance, mockTranslateService } from '@app/core/utility/test-utils';

// rxjs
import { Subject } from 'rxjs';

import { MobileNavItemPodComponent, MobileNavItemPodParams } from './mobile-nav-item-pod.component';


fdescribe('MobileNavItemPodComponent', () => {
  let cpnt: MobileNavItemPodComponent;
  let fixture: ComponentFixture<MobileNavItemPodComponent>;
  let cpntName = "MobileNavItemPod"
  beforeEach(async () => {
    await configureTestingModuleForComponents(MobileNavItemPodComponent,{mockTranslateService});
    ({fixture, cpnt} =  grabComponentInstance(MobileNavItemPodComponent));
    cpnt.meta = new MobileNavItemPodParams()
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
